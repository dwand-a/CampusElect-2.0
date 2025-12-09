import { addDoc, collection, doc, getDoc, getDocs, runTransaction, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../firebase'

const collections = {
  institutions: 'institutions',
  candidates: 'candidates',
  voters: 'voters',
  elections: 'elections',
  admins: 'admins',
}

export async function fetchInstitutions() {
  const snap = await getDocs(collection(db, collections.institutions))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function createInstitution(name) {
  const ref = await addDoc(collection(db, collections.institutions), {
    name,
    createdAt: serverTimestamp(),
  })
  return ref.id
}

export async function ensureSeedInstitutions() {
  const existing = await fetchInstitutions()
  if (existing.length) return existing
  await Promise.all(['College A', 'College B'].map((name) => createInstitution(name)))
  return fetchInstitutions()
}

export async function createElection({ name, date, institutionId, candidates }) {
  const candidateIds = []
  for (const candidateName of candidates) {
    const candidateRef = await addDoc(collection(db, collections.candidates), {
      name: candidateName,
      institutionId,
      votes: 0,
      createdAt: serverTimestamp(),
    })
    candidateIds.push(candidateRef.id)
  }

  const electionRef = await addDoc(collection(db, collections.elections), {
    name,
    date,
    institutionId,
    candidateIds,
    createdAt: serverTimestamp(),
  })
  return electionRef.id
}

export async function fetchElections() {
  const snap = await getDocs(collection(db, collections.elections))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function fetchCandidates(candidateIds = []) {
  if (!candidateIds.length) return []
  const snaps = await Promise.all(candidateIds.map((id) => getDoc(doc(db, collections.candidates, id))))
  return snaps.filter((s) => s.exists()).map((s) => ({ id: s.id, ...s.data() }))
}

export async function fetchElectionWithCandidates(electionId) {
  const electionSnap = await getDoc(doc(db, collections.elections, electionId))
  if (!electionSnap.exists()) return null
  const election = { id: electionSnap.id, ...electionSnap.data() }
  const candidates = await fetchCandidates(election.candidateIds || [])
  return { election, candidates }
}

export async function registerVoter(uid, data) {
  const voterRef = doc(db, collections.voters, uid)
  await setDoc(
    voterRef,
    {
      ...data,
      role: data.role || 'voter', // Default to voter if not specified
      votes: {},
      createdAt: serverTimestamp(),
    },
    { merge: true },
  )
}

export async function submitVote({ uid, electionId, candidateId }) {
  const voterRef = doc(db, collections.voters, uid)
  const candidateRef = doc(db, collections.candidates, candidateId)

  await runTransaction(db, async (tx) => {
    const voterSnap = await tx.get(voterRef)
    const voterData = voterSnap.exists() ? voterSnap.data() : null
    const alreadyVoted = voterData?.votes?.[electionId]
    if (alreadyVoted) {
      throw new Error('You already voted in this election.')
    }

    const candidateSnap = await tx.get(candidateRef)
    if (!candidateSnap.exists()) throw new Error('Candidate not found.')

    tx.update(candidateRef, { votes: (candidateSnap.data().votes || 0) + 1 })
    tx.set(
      voterRef,
      {
        votes: {
          ...(voterData?.votes || {}),
          [electionId]: candidateId,
        },
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    )
  })
}

export async function fetchTopResults(limit = 5) {
  const elections = await fetchElections()
  if (!elections.length) return []
  const results = []
  for (const election of elections) {
    const candidates = await fetchCandidates(election.candidateIds || [])
    results.push({
      election,
      candidates: candidates.sort((a, b) => (b.votes || 0) - (a.votes || 0)).slice(0, limit),
    })
  }
  return results
}

// Role management functions
export async function getUserRole(uid) {
  const voterRef = doc(db, collections.voters, uid)
  const voterSnap = await getDoc(voterRef)
  if (!voterSnap.exists()) return null
  return voterSnap.data().role || 'voter'
}

export async function isAdmin(uid) {
  const role = await getUserRole(uid)
  return role === 'admin'
}

// Admin initialization - only runs once
const ADMIN_INIT_KEY = 'admin_initialized'
export async function initializeDefaultAdmin() {
  console.log('🔧 Starting admin initialization...')
  
  try {
    const adminEmail = 'dwanda@stu.ncu.edu.jm'
    const adminPassword = 'Password123'
    const adminName = 'Admin'

    // First, try to sign in to see if admin user already exists
    let adminUid = null
    let isNewUser = false
    
    try {
      console.log('🔐 Attempting to sign in to existing admin account...')
      const signInResult = await signInWithEmailAndPassword(auth, adminEmail, adminPassword)
      adminUid = signInResult.user.uid
      console.log('✅ Signed in to existing admin account, UID:', adminUid)
    } catch (signInError) {
      // Handle different error codes
      if (signInError.code === 'auth/user-not-found' || signInError.code === 'auth/invalid-credential') {
        console.log('👤 Admin user not found, creating new account...')
        try {
          // User doesn't exist, create it
          const adminUser = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword)
          adminUid = adminUser.user.uid
          isNewUser = true
          console.log('✅ Admin user created in Auth, UID:', adminUid)
        } catch (createError) {
          if (createError.code === 'auth/email-already-in-use') {
            // User exists but we couldn't sign in - might be wrong password
            console.error('❌ Admin email already exists but sign-in failed')
            throw new Error('Admin email exists but authentication failed. Please check Firebase Console or reset password.')
          }
          throw createError
        }
      } else if (signInError.code === 'auth/wrong-password') {
        console.error('❌ Admin account exists but password is incorrect')
        throw new Error('Admin account exists but password is incorrect. Please reset password in Firebase Console.')
      } else {
        console.error('❌ Sign-in error:', signInError.code, signInError.message)
        throw signInError
      }
    }

    // Now we're authenticated, check if voter record exists
    console.log('📋 Checking for existing voter record...')
    const voterRef = doc(db, collections.voters, adminUid)
    const voterSnap = await getDoc(voterRef)
    
    if (voterSnap.exists()) {
      const voterData = voterSnap.data()
      console.log('📝 Found existing voter record, checking role...')
      
      if (voterData.role === 'admin') {
        console.log('✅ Admin already has admin role')
        // Check initialization flag
        const initDoc = await getDoc(doc(db, 'system', ADMIN_INIT_KEY))
        if (!initDoc.exists() || !initDoc.data().initialized) {
          console.log('📝 Marking initialization as complete...')
          await setDoc(doc(db, 'system', ADMIN_INIT_KEY), {
            initialized: true,
            initializedAt: serverTimestamp(),
          })
        }
        // Sign out after initialization check
        await signOut(auth)
        return { success: true, message: 'Admin already initialized' }
      } else {
        console.log('📝 Updating existing voter to admin role...')
        await setDoc(
          voterRef,
          { role: 'admin', name: adminName },
          { merge: true },
        )
        console.log('✅ Updated existing voter to admin role')
      }
    } else {
      console.log('📝 Creating new admin voter record in Firestore...')
      // Create admin voter record
      await setDoc(voterRef, {
        email: adminEmail,
        name: adminName,
        role: 'admin',
        votes: {},
        createdAt: serverTimestamp(),
      })
      console.log('✅ Admin voter record created in Firestore')
    }

    console.log('📝 Marking initialization as complete...')
    // Mark as initialized
    await setDoc(doc(db, 'system', ADMIN_INIT_KEY), {
      initialized: true,
      initializedAt: serverTimestamp(),
    })

    // Sign out after initialization (user can log in normally later)
    await signOut(auth)
    console.log('✅ Admin initialization completed successfully!')
    return { success: true, message: 'Default admin initialized successfully' }
  } catch (error) {
    console.error('❌ Error initializing admin:', error)
    console.error('Error code:', error.code)
    console.error('Error message:', error.message)
    // Make sure to sign out on error
    try {
      await signOut(auth)
    } catch (e) {
      // Ignore sign out errors
    }
    return { success: false, message: error.message, code: error.code }
  }
}

// Admin management functions
export async function deleteInstitution(institutionId) {
  // Check if institution has elections
  const electionsSnap = await getDocs(collection(db, collections.elections))
  const hasElections = electionsSnap.docs.some((d) => d.data().institutionId === institutionId)
  if (hasElections) {
    throw new Error('Cannot delete institution with existing elections')
  }
  await setDoc(doc(db, collections.institutions, institutionId), { deleted: true }, { merge: true })
}

export async function updateInstitution(institutionId, name) {
  await setDoc(
    doc(db, collections.institutions, institutionId),
    { name, updatedAt: serverTimestamp() },
    { merge: true },
  )
}

export async function deleteElection(electionId) {
  const electionSnap = await getDoc(doc(db, collections.elections, electionId))
  if (!electionSnap.exists()) throw new Error('Election not found')
  
  // Optionally delete associated candidates
  const election = electionSnap.data()
  if (election.candidateIds) {
    await Promise.all(
      election.candidateIds.map((candidateId) =>
        setDoc(doc(db, collections.candidates, candidateId), { deleted: true }, { merge: true }),
      ),
    )
  }
  
  await setDoc(doc(db, collections.elections, electionId), { deleted: true }, { merge: true })
}


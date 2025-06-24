import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAJm0LiLJchN86HzeCJHn3qKqdOhv0H_DE",
  authDomain: "niranjan-58d39.firebaseapp.com",
  projectId: "niranjan-58d39",
  storageBucket: "niranjan-58d39.firebasestorage.app",
  messagingSenderId: "686044853285",
  appId: "1:686044853285:web:5b08fbac20d2c80bdd7bcc",
  measurementId: "G-L30Y7NK061"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const container = document.getElementById("staffContainer");

container.innerHTML = "";

async function loadFaculty() {
  const querySnapshot = await getDocs(collection(db, "staff"));
  querySnapshot.forEach((doc) => {
    const staff = doc.data();


    const photoUrl = staff.imageUrl || "https://via.placeholder.com/80";

const card = `
  <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="400">
    <a href="https://staff-management-msec.web.app/" target="_blank" style="text-decoration: none; color: inherit;">
      <div class="faculty-card m-1 row align-items-center justify-content-center">
        <div class="faculty-image1">
          <img src="${photoUrl}" class="img-fluid" alt="Faculty Member">
        </div>
        <div class="faculty-info">
          <h4>${staff.firstName  || 'No Name'} ${staff.lastName  || 'No Name'}</h4>
          <p class="faculty-title">${staff.designation || ''}, ${staff.department || ''}</p>
          <div class="faculty-specialties">
            ${(staff.specialties || []).map(spec => `<span>${spec}</span>`).join('')}
          </div>
          <div class="faculty-contact1 text-danger">
            <i class="bi bi-envelope text-danger"></i> ${staff.email || 'Email'}
            <br/>
            <i class="bi bi-person"></i> Profile
          </div>
        </div>
      </div>
    </a>
  </div>
`;


    container.innerHTML += card;
  });

  // ✅ Re-initialize AOS after dynamic content loads
  AOS.init();
}

// ✅ Call the function
loadFaculty();

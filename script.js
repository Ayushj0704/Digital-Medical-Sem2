class Stack {
    constructor() {
      this.items = [];
    }
    push(item) {
      this.items.push(item);
    }
    pop() {
      if (this.isEmpty()) return null;
      return this.items.pop();
    }
    peek() {
      return this.items[this.items.length - 1];
    }
    isEmpty() {
      return this.items.length === 0;
    }
  }
  
  class Queue {
    constructor() {
      this.items = [];
    }
    enqueue(item) {
      this.items.push(item);
    }
    dequeue() {
      if (this.isEmpty()) return null;
      return this.items.shift();
    }
    isEmpty() {
      return this.items.length === 0;
    }
  }
  
  const prescriptionHistoryStack = new Stack();
  const tokenQueue = new Queue();
  
  document.addEventListener('DOMContentLoaded', function () {
    const prescriptionForm = document.getElementById('prescriptionForm');
    const prescriptionList = document.getElementById('prescriptionList');
    const tokenInput = document.getElementById('tokenInput');
    const collectButton = document.getElementById('collectButton');
    const collectionMessage = document.getElementById('collectionMessage');
    const issuedToken = document.getElementById('issuedToken');
  
    prescriptionForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const doctorName = document.getElementById('doctorName').value;
      const patientName = document.getElementById('patientName').value;
      const medicineName = document.getElementById('medicineName').value;
      const dosage = document.getElementById('dosage').value;
      const token = generateToken();
  
      const prescription = {
        doctorName,
        patientName,
        medicineName,
        dosage,
        token,
      };
  
      prescriptionHistoryStack.push(prescription);
      tokenQueue.enqueue(token);
  
      addPrescriptionToList(prescription);
  
      prescriptionForm.reset();
  
      issuedToken.textContent = `Prescription Token Issued: ${token}`;
      issuedToken.style.color = 'green';
      issuedToken.style.fontWeight = 'bold';
    });
  
    function generateToken() {
      return Math.random().toString(36).substr(2, 9);
    }
  
    function addPrescriptionToList(prescription) {
      const listItem = document.createElement('li');
      listItem.textContent = `Doctor: ${prescription.doctorName}, Patient: ${prescription.patientName}, Medicine: ${prescription.medicineName}, Dosage: ${prescription.dosage}, Token: ${prescription.token}`;
      prescriptionList.appendChild(listItem);
    }
  
    collectButton.addEventListener('click', function () {
      const token = tokenInput.value;
      if (tokenQueue.isEmpty()) {
        collectionMessage.textContent = 'No tokens available for collection.';
        return;
      }
  
      const collectedToken = tokenQueue.dequeue();
      if (collectedToken === token) {
        collectionMessage.textContent = `Medication collected successfully for token: ${token}.`;
      } else {
        collectionMessage.textContent = `Token ${token} is not valid.`;
      }
      tokenInput.value = '';
    });
  });
  
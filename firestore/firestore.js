// Import the functions you need from the CDN
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore, collection, getDocs, doc, setDoc, serverTimestamp, query, where,addDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC57Wd4cXatpSlgnkBo8yW3V3HezgjV-Nc",
    authDomain: "courses-db-38f25.firebaseapp.com",
    projectId: "courses-db-38f25",
    storageBucket: "courses-db-38f25.appspot.com",
    messagingSenderId: "116823521890",
    appId: "1:116823521890:web:2234c740f25e0f69c12f3b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
console.log(db)
const GET_PAYMENT_DATA = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "Payment-Table"));
        const data = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            data.push(doc.data());
        });
        return data;
    } catch (e) {
        console.log(e);
        return [];
    }
};
const pay_data = await GET_PAYMENT_DATA()
const GET_SUBSCRIPTION_DATA = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "Subscription-Table"));
        const data = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            data.push(doc.data());
        });
        return data;
    } catch (e) {
        console.log(e);
        return [];
    }
};
const sub_data = await GET_SUBSCRIPTION_DATA()

const GET_COURSE_DATA = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "Courses-Table"));
        const data = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            data.push(doc.data());
        });
        return data;
    } catch (e) {
        console.log(e);
        return [];
    }
}
const course_data = await GET_COURSE_DATA()
const GET_COUPONS_DATA = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "Coupons-Table"));
        const data = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            data.push(doc.data());
        });
        return data;
    } catch (e) {
        console.log(e);
        return [];
    }
}
const coupons_data = await GET_COUPONS_DATA()
console.log("SUBSCRIBER DATA:", sub_data)
console.log("PAYMENT DATA:", pay_data)
console.log("COURSE DATA:", course_data)
console.log("COUPONS DATA:", coupons_data)





const POST_SUBSCRIBER_DATA = async (data) => {
    // Add a new document with a generated id.
    const q = query(collection(db, "Courses-Table"), where("course_id", "==", data.course_id));
    let course_duration = 0;

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        course_duration = doc.data().duration;
    });

    const addDaysToDate = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };
    const start_date = new Date(); // Current date and time
    const end_date = addDaysToDate(start_date, course_duration);

    const sub_data = {
        subscriber_id: data.subscriber_id,
        subscriber_name: data.subscriber_name,
        subscriber_email: data.subscriber_email,
        subscriber_phone: data.subscriber_phone,
        father_name: data.father_name,
        status: data.status,
        start_date: start_date,
        end_date: end_date,
        payment_id: data.payment_id,
        created_at: new Date(),
        course_id: data.course_id
    }
    const docRef = await addDoc(collection(db, "Subscription-Table"), sub_data);
    console.log("Document written with ID: ", docRef.id);
}
//structure of subscriber json structure
const sub_post_data = {
    subscriber_id: "5lkh48",
    subscriber_name: "tharun",
    subscriber_email: "abc@gmail.com",
    subscriber_phone: "9443919192",
    father_name: "mohan",
    status: "ok",
    payment_id: "lkajsdfbih",
    course_id: "abcd"
}
// POST_SUBSCRIBER_DATA(sub_post_data)





//POST PAYMENT DATA 
const POST_PAYMENT_DATA = async (data) => {
   try{
    const pay_data = {
        payment_id: data.payment_id,
        amount : data.amount,
        payment_method: data.payment_method,
        payment_status : data.status,
        transaction_id : data.transaction_id,
        created_at : new Date()
    }
    console.log(pay_data)
    const docRef = await addDoc(collection(db, "Payment-Table"), pay_data);
    console.log("Document written with ID: ", docRef.id);
   }
   catch(e){
    console.log(e);
   }
}
///structure of the payment json
const post_pay_data = {
    payment_id: "lkjhsdf",
    amount : 1000,
    payment_method: "card",
    status : "ok",
    transaction_id : "123456"
}



//POST COUPON DATA 
const POST_COUPON_DATA = async (data) => {
    try{
     const coupon_data = {
        coupon_id: data.coupon_id,
        offer : data.offer,
        validity : data.validity
     }
     console.log(coupon_data)
     const docRef = await addDoc(collection(db, "Coupons-Table"), coupon_data);
     console.log("Document written with ID: ", docRef.id);
    }
    catch(e){
     console.log(e);
    }
 }
 ///structure of the payment json
 const post_coupon_data = {
    coupon_id: "asdf",
    offer : ".1",
    validity : new Date()
 }



 //POST COUPON DATA 
const POST_COURSE_DATA = async (data) => {
    try{
     const course_data = {
        course_id: data.course_id,
        course_name : data.course_name,
        course_description : data.description,
        course_price : data.course_price,
        course_duration : data.duration
     }
     console.log(data)
     const docRef = await addDoc(collection(db, "Courses-Table"), course_data);
     console.log("Document written with ID: ", docRef.id);
    }
    catch(e){
     console.log(e);
    }
 }
 ///structure of the payment json
 const post_course_data = {
        course_id: "asdfas",
        course_name : "NEET BOOTCAMP",
        description : "AKJSHFAJKSDLHF LASHDFKLHASDFLK ASLKDFHKLH",
        course_price : 4000,
        duration : 60
 }


 
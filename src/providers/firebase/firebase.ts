import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class FirebaseProvider {

    constructor(public afs: AngularFirestore, public storage: AngularFireStorage, public auth: AngularFireAuth) { }

    //  FIRESTORE DATABASE
    
    getItems() {
        return this.afs.collection('/items');
        // return this.afd.list('/items/');
    }

    addItem(item) {
        this.afs.collection('/items').add({data: item})
        .then(function() { console.log("item written."); })
        .catch(error => { console.log("error:" + error)});
        // this.afd.list('/items/').push(item);
    }

    removeItem(item) {
        
        this.afs.collection('/items').doc(item).delete();
    }

    //  FIREBASE STORAGE
    getURL(){
        return this.storage.ref('pet3.png').getDownloadURL();
    }

    //  FIREBASE AUTH
    signInWithEmail(credentials) {
        console.log('Sign in with email');
        return this.auth.auth.signInWithEmailAndPassword(credentials.email,credentials.password);
    }

    signOut(): Promise<void> {
        return this.auth.auth.signOut();
    }

    signUp(credentials) {
        console.log('Sign up');
        return this.auth.auth.createUserWithEmailAndPassword(credentials.email,credentials.password);
    }

    get authenticated(): boolean {
        return (this.auth.auth.currentUser !== null);
    }

    getEmail() {
        if (this.auth.auth.currentUser) {
            console.log("Email: " + this.auth.auth.currentUser.email);
            return this.auth.auth.currentUser.email;
        } else {
            console.log("Email not set");
            return null;
        }
    }
}
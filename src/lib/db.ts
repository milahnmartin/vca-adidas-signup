import type { Firestore, DocumentData } from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface Interaction {
  get: (email: string) => Promise<DocumentData | undefined>;
  set: (data: Record<string, any>) => Promise<void>;
}

export class Db implements Interaction {
  private db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
  }

  public async get(email: string): Promise<DocumentData | undefined> {
    const userDoc = doc(this.db, "users", email);
    const userSnap = await getDoc(userDoc);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      return undefined;
    }
  }

  public async set(data: Record<string, any>): Promise<void> {
    if (!data.email) {
      throw new Error("Email is required");
    }

    const userDoc = doc(this.db, "users", data.email);
    await setDoc(userDoc, data, { merge: true });
  }
}

class UserSessionTracker {
  constructor() {
    // Set to store unique active user IDs
    this.activeUsers = new Set();
    
    // WeakMap to store user objects and associated metadata
    this.userMetadata = new WeakMap();
  }

  // Add a new user to the tracker
  addUser(user) {
    this.activeUsers.add(user.id);
    this.userMetadata.set(user, { lastActivity: Date.now() });
    console.log(`User ${user.id} added.`);
  }

  // Remove a user from the tracker
  removeUser(user) {
    this.activeUsers.delete(user.id);
    this.userMetadata.delete(user);
    console.log(`User ${user.id} removed.`);
  }

  // Update last activity timestamp of a user
  updateUserActivity(user) {
    if (this.userMetadata.has(user)) {
      this.userMetadata.get(user).lastActivity = Date.now();
      console.log(`User ${user.id} activity updated.`);
    } else {
      console.log(`User ${user.id} not found.`);
    }
  }

  // Clean up inactive users
  cleanUpInactiveUsers(inactivityThreshold = 60000) { // Default: 60 seconds
    const now = Date.now();
    for (let user of this.userMetadata.keys()) {
      const metadata = this.userMetadata.get(user);
      if (now - metadata.lastActivity > inactivityThreshold) {
        console.log(`User ${user.id} is inactive. Removing...`);
        this.removeUser(user);
      }
    }
  }

  // Helper function to simulate a user object
  createUser(id) {
    return { id };
  }
}

// Demonstrating the functionality
const tracker = new UserSessionTracker();

// Create user objects
const user1 = tracker.createUser(1);
const user2 = tracker.createUser(2);
const user3 = tracker.createUser(3);

// Add users
tracker.addUser(user1);
tracker.addUser(user2);
tracker.addUser(user3);

// Simulate some activity
setTimeout(() => tracker.updateUserActivity(user1), 5000); // User 1 activity update after 5 seconds

// Clean up inactive users (after 6 seconds, User 2 and 3 should be removed)
setTimeout(() => tracker.cleanUpInactiveUsers(6000), 6000);

// Demonstrate garbage collection
setTimeout(() => {
  console.log("User 3 will be garbage collected due to reference removal.");
  tracker.removeUser(user3); // User 3 is removed and eligible for garbage collection now
}, 8000);

db = db.getSiblingDB("got_db");

db.createUser({
  user: "jon_snow",
  pwd: "ygritte",
  roles: [
    {
      role: "readWrite",
      db: "got_db",
    },
  ],
});

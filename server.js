const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const users = [
  {
    id: "5000000147",
    password: "admin123",
    name: "Abdul Razaque",
    program: "BSc. Artificial Intelligence",
    semester: "Fall 2026"
  }
];

const dashboardData = {
  nav: [
    { label: "Dashboard", icon: "layout-dashboard", section: "Dashboard" },
    { label: "My Results", icon: "graduation-cap", section: "My Results" },
    { label: "Courses", icon: "book-open", section: "Courses" },
    { label: "Timetable", icon: "calendar-days", section: "Timetable" },
    { label: "Fee Voucher", icon: "receipt", section: "Fee Voucher" },
    { label: "Hostel", icon: "building-2", section: "Hostel" },
    { label: "Transcript", icon: "file-text", section: "Transcript" },
    { label: "Attendance", icon: "clipboard-check", section: "Attendance" },
    { label: "Complaints", icon: "message-square-plus", section: "Complaints" }
  ],
  stats: [
    { label: "Current GPA", value: "3.78", meta: "Top 12% of cohort", tone: "blue", icon: "award" },
    { label: "Registered courses", value: "7", meta: "Fall 2026 semester", tone: "cyan", icon: "book-open" },
    { label: "Attendance", value: "92%", meta: "Above 85% requirement", tone: "green", icon: "clipboard-check" },
    { label: "Upcoming events", value: "4", meta: "Next: Quiz · Tomorrow", tone: "orange", icon: "calendar-clock" }
  ],
  services: [
    { title: "Timetable", description: "View your weekly class schedule", icon: "calendar-days", tone: "blue" },
    { title: "Fee Voucher", description: "Download and pay your dues", icon: "receipt", tone: "purple" },
    { title: "Hostel", description: "Room, mess and hostel services", icon: "building-2", tone: "cyan" },
    { title: "Transcript", description: "View your academic transcript", icon: "file-text", tone: "blue" },
    { title: "Transport", description: "Bus routes and seat booking", icon: "bus", tone: "green" },
    { title: "Exam Card", description: "Download your exam admit card", icon: "id-card", tone: "purple" },
    { title: "Student File", description: "Refunds, scholarships and requests", icon: "folder-open", tone: "cyan" },
    { title: "Course registration", description: "Register for next semester", icon: "sparkles", tone: "blue" }
  ],
  sections: {
    Dashboard: {
      hero: {
        eyebrow: "FALL 2026 · WEEK 7",
        title: "Good morning, Abdul.",
        text: "Here’s what’s happening with your academic journey today.",
        primary: "Register for courses"
      }
    },
    "My Results": {
      eyebrow: "ACADEMIC RECORD",
      title: "My Results",
      text: "Review your latest semester performance and grades.",
      cards: [
        { label: "Fall 2026 GPA", value: "3.78", meta: "Excellent standing" },
        { label: "Completed credits", value: "84", meta: "12 credits in progress" },
        { label: "Latest result", value: "A-", meta: "Artificial Intelligence" }
      ]
    },
    Courses: {
      eyebrow: "COURSE REGISTRATION",
      title: "Register Subjects",
      text: "Choose subjects for your BS Artificial Intelligence degree.",
      list: [
        { name: "Artificial Intelligence", detail: "BS AI · 3 credits · Core subject" },
        { name: "Machine Learning", detail: "BS AI · 3 credits · Core subject" },
        { name: "Data Structures and Algorithms", detail: "BS AI · 3 credits · Core subject" }
      ]
    },
    "Fee Voucher": {
      eyebrow: "PAYMENTS",
      title: "Fee Voucher",
      text: "View your current semester dues and payment status.",
      amount: "PKR 145,000",
      due: "Due date: 30 September 2026"
    },
    Timetable: {
      eyebrow: "WEEKLY SCHEDULE",
      title: "Timetable",
      text: "Your classes for Fall 2026, Week 7.",
      schedule: [
        { time: "09:00", title: "Artificial Intelligence", meta: "Room B-204 · Monday" },
        { time: "11:00", title: "Machine Learning", meta: "Lab 3 · Tuesday" },
        { time: "14:00", title: "Data Structures and Algorithms", meta: "Room A-110 · Wednesday" }
      ]
    },
    Hostel: {
      eyebrow: "CAMPUS LIVING",
      title: "Hostel",
      text: "Room and residence services for your student accommodation.",
      info: "Room A-204",
      meta: "Block A · Semester residence active"
    },
    Transcript: {
      eyebrow: "ACADEMIC DOCUMENTS",
      title: "Transcript",
      text: "Access your official academic record.",
      info: "Official transcript",
      meta: "Updated after Fall 2026 Week 6"
    },
    Attendance: {
      eyebrow: "CLASS PARTICIPATION",
      title: "Attendance",
      text: "Track attendance across your registered subjects.",
      cards: [
        { label: "Overall attendance", value: "92%", meta: "Above 85% requirement" },
        { label: "Best attendance", value: "98%", meta: "Data Structures" },
        { label: "Classes attended", value: "46/50", meta: "Fall 2026" }
      ]
    },
    Settings: {
      eyebrow: "PORTAL PREFERENCES",
      title: "Settings",
      text: "Manage your student portal preferences.",
      info: "Account settings",
      meta: "Language: English · Notifications: Enabled"
    },
    Complaints: {
      eyebrow: "STUDENT SUPPORT",
      title: "Submit a Complaint",
      text: "Send an issue or request to the student support team.",
      form: true
    }
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "sap-student-portal-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false
    }
  })
);

app.use(express.static(__dirname));

app.get("/api/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ authenticated: false, message: "Not logged in" });
  }

  return res.json({ authenticated: true, user: req.session.user });
});

app.get("/api/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ authenticated: false, message: "Not logged in" });
  }

  return res.json({
    authenticated: true,
    user: req.session.user,
    dashboard: dashboardData
  });
});

app.post("/api/login", (req, res) => {
  const { userId, password } = req.body || {};
  if (!userId || !password) {
    return res.status(400).json({ success: false, message: "User ID and password are required." });
  }

  const user = users.find(
    (entry) => String(entry.id) === String(userId) && String(entry.password) === String(password)
  );

  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid user ID or password." });
  }

  req.session.user = {
    id: user.id,
    name: user.name,
    program: user.program,
    semester: user.semester
  };

  return res.json({ success: true, user: req.session.user });
});

app.post("/api/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ success: false, message: "Unable to log out." });
    }

    return res.json({ success: true });
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "SAP.html"));
});

app.listen(PORT, () => {
  console.log(`SAP backend running on http://localhost:${PORT}`);
});

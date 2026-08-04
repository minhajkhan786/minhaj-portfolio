export type Project = {
  title: string;
  label: string;
  index: string;
  summary: string;
  contribution: string;
  stack: string[];
  features: string[];
  accent: "cyan" | "coral" | "lime";
  monogram: string;
  storeUrl?: string;
};

export const profile = {
  email: "minhajkhan.dev@gmail.com",
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/",
  company: "Technogigz Solutions Pvt. Ltd.",
};

export const projects: Project[] = [
  {
    title: "Lands & Homes",
    label: "Real estate",
    index: "01",
    summary: "A property discovery experience built to make browsing, comparing and connecting around real estate feel direct and dependable.",
    contribution: "Responsive Flutter UI, REST API integration, location workflows and production issue resolution.",
    stack: ["Flutter", "REST API", "Google Maps", "Firebase"],
    features: ["Property discovery", "Location search", "Saved listings"],
    accent: "cyan",
    monogram: "LH",
  },
  {
    title: "Salvaging",
    label: "Construction marketplace",
    index: "02",
    summary: "A specialized marketplace connecting construction inventory and demand through a clean mobile buying and selling journey.",
    contribution: "Marketplace screens, API data flows, authentication states and responsive component development.",
    stack: ["Flutter", "Bloc", "REST API", "Firebase"],
    features: ["Listings", "Seller workflows", "Search & filters"],
    accent: "coral",
    monogram: "SV",
  },
  {
    title: "Horodope",
    label: "Astrology",
    index: "03",
    summary: "A personalized astrology application that turns detailed guidance and daily content into an approachable mobile experience.",
    contribution: "UI implementation, API integration, notification flows and reusable Flutter components.",
    stack: ["Flutter", "GetX", "REST API", "FCM"],
    features: ["Daily insights", "Personal profiles", "Push alerts"],
    accent: "lime",
    monogram: "HD",
  },
  {
    title: "Cricdope",
    label: "Sports",
    index: "04",
    summary: "A cricket prediction and live-score product designed for fast match updates and engaged, repeat participation.",
    contribution: "Real-time data UI, Socket.IO integration, state management and performance optimization.",
    stack: ["Flutter", "Socket.IO", "REST API", "Provider"],
    features: ["Live scores", "Predictions", "Match updates"],
    accent: "cyan",
    monogram: "CD",
  },
  {
    title: "Way",
    label: "Marketplace",
    index: "05",
    summary: "A mobile marketplace focused on fast discovery, structured listings and a low-friction customer journey.",
    contribution: "Responsive UI, product flows, backend integration and state-driven interaction states.",
    stack: ["Flutter", "Bloc", "REST API", "Firebase Auth"],
    features: ["Product discovery", "User accounts", "Order flow"],
    accent: "coral",
    monogram: "WY",
  },
  {
    title: "MotoRepo",
    label: "Vehicle inspection",
    index: "06",
    summary: "A field-ready vehicle inspection application for capturing, organizing and reviewing assessment data efficiently.",
    contribution: "Inspection workflows, local persistence, media capture flows and API synchronization.",
    stack: ["Flutter", "SQLite", "REST API", "Clean Architecture"],
    features: ["Digital inspections", "Media records", "Offline data"],
    accent: "lime",
    monogram: "MR",
  },
  {
    title: "Cranes24 Customer",
    label: "Logistics",
    index: "07",
    summary: "A crane booking platform that helps customers request equipment, follow bookings and manage service needs from mobile.",
    contribution: "Booking experience, maps, payments, notifications and customer-side API integration.",
    stack: ["Flutter", "Google Maps", "Razorpay", "FCM"],
    features: ["Crane booking", "Live location", "Payments"],
    accent: "cyan",
    monogram: "C24",
  },
  {
    title: "Cranes24 Driver",
    label: "Driver operations",
    index: "08",
    summary: "A companion operations app enabling drivers to receive jobs, navigate assignments and update booking progress in real time.",
    contribution: "Driver workflows, background location UI, real-time updates and notification handling.",
    stack: ["Flutter", "Socket.IO", "Google Maps", "FCM"],
    features: ["Job management", "Navigation", "Live status"],
    accent: "coral",
    monogram: "D24",
  },
];

export const skillGroups = [
  { title: "Mobile", skills: ["Flutter", "Dart", "Material Design", "Responsive UI"] },
  { title: "State & architecture", skills: ["Bloc", "Provider", "GetX", "MVC", "Clean Architecture"] },
  { title: "Backend & data", skills: ["Node.js", "Express.js", "Prisma ORM", "Redis", "PostgreSQL", "Firestore"] },
  { title: "Platform", skills: ["REST API", "Socket.IO", "Firebase", "Google Maps", "FCM", "Git"] },
];

export const services = [
  ["01", "Flutter app development", "Scalable mobile products with maintainable architecture and polished native-feeling interactions."],
  ["02", "Firebase integration", "Authentication, Firestore, cloud messaging and dependable app-to-cloud workflows."],
  ["03", "API & backend integration", "REST APIs, real-time Socket.IO events, secure auth and resilient data handling."],
  ["04", "Performance optimization", "Profiling, rendering improvements and focused fixes that keep apps responsive."],
  ["05", "UI development", "Responsive interfaces translated from product requirements into reusable Flutter components."],
  ["06", "Deployment & support", "Bug fixing, release preparation and Play Store or App Store deployment support."],
];

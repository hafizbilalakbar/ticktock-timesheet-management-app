const PROJECTS = [
  "Website Redesign", "Mobile App", "Backend API",
  "Marketing Site", "Internal Tools", "Client Portal",
  "E-commerce Platform", "Analytics Dashboard",
];

const WORK_TYPES = [
  "Bug fixes", "Feature development", "Code review",
  "Documentation", "Meeting", "Testing", "Design", "Deployment",
];

const TASKS = [
  "Homepage hero section", "Navigation menu fix", "API integration",
  "Code review", "Database schema design", "Unit testing",
  "Team standup", "Performance optimization", "Dashboard charts",
  "Bug fix: login redirect", "Email templates", "Sprint planning",
  "API documentation", "Push notifications", "Landing page",
  "Database migration", "User onboarding flow", "SEO optimization",
  "Component library", "Team retro", "Search functionality",
  "Payment gateway integration", "Responsive layout fixes",
  "Authentication flow", "File upload system", "Data export feature",
  "Notification system", "Search bar component", "Footer redesign",
  "Loading states", "Error boundaries", "Form validation",
  "State management setup", "Route configuration", "CSS animations",
  "Dark mode toggle", "Accessibility audit", "Cross-browser testing",
  "Performance profiling", "Security review", "Logging system",
  "Error tracking setup", "CI/CD pipeline", "Docker setup",
  "Load testing", "API rate limiting", "Caching strategy",
  "Database indexing", "Query optimization", "Backup system",
];

const STATUSES = ["COMPLETED", "INCOMPLETE", "MISSING"];

function generateDateRange(weekIndex) {
  const start = new Date(2024, 0, 1);
  start.setDate(start.getDate() + weekIndex * 7);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  const fmt = (d) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  return { startDate: fmt(start), endDate: fmt(end) };
}

export function formatDateRange(startDateStr, endDateStr) {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  
  const startDay = start.getDate();
  const endDay = end.getDate();
  const startMonth = start.toLocaleDateString("en-US", { month: "long" });
  const endMonth = end.toLocaleDateString("en-US", { month: "long" });
  const year = start.getFullYear();
  
  if (startMonth === endMonth) {
    return `${startDay} - ${endDay} ${startMonth}, ${year}`;
  } else {
    return `${startDay} ${startMonth} - ${endDay} ${endMonth}, ${year}`;
  }
}

function generateTimesheets(count) {
  const timesheets = [];
  for (let i = 0; i < count; i++) {
    const { startDate, endDate } = generateDateRange(i);
    const statusIdx = i % 3;
    const totalHours = 40;
    const loggedHours = statusIdx === 0 ? 40 : statusIdx === 1 ? 20 + (i % 15) : 0;
    timesheets.push({
      id: `week-${i + 1}`,
      weekNumber: i + 1,
      startDate,
      endDate,
      status: STATUSES[statusIdx],
      totalHours,
      loggedHours,
    });
  }
  return timesheets;
}

function generateEntries(timesheets) {
  const entries = [];
  let entryId = 1;

  timesheets.forEach((ts) => {
    const weekStartMatch = ts.startDate.match(/^(\w{3})\s(\d+)/);
    const weekEndMatch = ts.endDate.match(/^(\w{3})\s(\d+)/);
    if (!weekStartMatch || !weekEndMatch) return;

    const startMonth = weekStartMatch[1];
    const startDay = parseInt(weekStartMatch[2]);
    const endDay = parseInt(weekEndMatch[2]);
    const monthAbbr = startMonth;

    const daysInWeek = [];
    for (let d = startDay; d <= endDay; d++) {
      daysInWeek.push(`${monthAbbr} ${d}`);
    }

    if (ts.status === "MISSING") return;

    const entriesPerDay = ts.status === "COMPLETED" ? 2 : 1 + (ts.weekNumber % 2);
    let hoursAssigned = 0;

    daysInWeek.forEach((dayLabel, dayIdx) => {
      if (hoursAssigned >= ts.loggedHours) return;

      const entryCount = Math.min(entriesPerDay, Math.ceil((ts.loggedHours - hoursAssigned) / 4));
      for (let e = 0; e < entryCount && hoursAssigned < ts.loggedHours; e++) {
        const hours = Math.min(
          4 + (entryId % 5) * 2,
          ts.loggedHours - hoursAssigned
        );
        if (hours <= 0) break;
        hoursAssigned += hours;

        const taskIdx = (entryId + dayIdx + e) % TASKS.length;
        const projIdx = (entryId + dayIdx) % PROJECTS.length;
        const workIdx = (entryId + e) % WORK_TYPES.length;

        const dateObj = new Date(2024, 0, startDay + dayIdx);
        const dateStr = dateObj.toISOString().split("T")[0];

        entries.push({
          id: `entry-${entryId}`,
          weekId: ts.id,
          date: dateStr,
          dayLabel,
          taskName: TASKS[taskIdx],
          projectName: PROJECTS[projIdx],
          typeOfWork: WORK_TYPES[workIdx],
          description: `Completed ${TASKS[taskIdx].toLowerCase()} for ${PROJECTS[projIdx]}`,
          hours,
        });
        entryId++;
      }
    });
  });

  return entries;
}

const timesheets = generateTimesheets(500);
const entries = generateEntries(timesheets);

export { timesheets, entries, PROJECTS, WORK_TYPES };

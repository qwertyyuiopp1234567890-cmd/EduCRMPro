/* EduCRM Pro – localStorage data layer */
(function (global) {
  const KEYS = {
    users: 'ec_users',
    session: 'ec_session',
    students: 'ec_students',
    teachers: 'ec_teachers',
    courses: 'ec_courses',
    groups: 'ec_groups',
    attendance: 'ec_attendance',
    payments: 'ec_payments',
    schedule: 'ec_schedule',
    seeded: 'ec_seeded_v1'
  };

  function read(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch (e) { return fallback; }
  }
  function write(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

  function seedIfNeeded() {
    if (localStorage.getItem(KEYS.seeded)) return;
    write(KEYS.users, [{ id: uid(), name: 'Admin', email: 'admin@educrm.app', password: 'admin123', role: 'admin' }]);
    const teachers = [
      { id: uid(), name: 'Sarah Khan', subject: 'Mathematics', phone: '+1 555 0101', email: 'sarah@educrm.app' },
      { id: uid(), name: 'David Lee',  subject: 'Physics',     phone: '+1 555 0102', email: 'david@educrm.app' },
      { id: uid(), name: 'Aisha Rahman', subject: 'English',   phone: '+1 555 0103', email: 'aisha@educrm.app' }
    ];
    const courses = [
      { id: uid(), title: 'Algebra Foundations', teacherId: teachers[0].id, fee: 120, durationWeeks: 8 },
      { id: uid(), title: 'Mechanics 101',       teacherId: teachers[1].id, fee: 150, durationWeeks: 10 },
      { id: uid(), title: 'Academic Writing',    teacherId: teachers[2].id, fee: 100, durationWeeks: 6 }
    ];
    const students = [
      { id: uid(), name: 'Liam Walker',   age: 16, phone: '+1 555 0201', email: 'liam@example.com',  parent: 'John Walker' },
      { id: uid(), name: 'Emma Patel',    age: 17, phone: '+1 555 0202', email: 'emma@example.com',  parent: 'Priya Patel' },
      { id: uid(), name: 'Noah Garcia',   age: 15, phone: '+1 555 0203', email: 'noah@example.com',  parent: 'Maria Garcia' },
      { id: uid(), name: 'Olivia Chen',   age: 16, phone: '+1 555 0204', email: 'olivia@example.com', parent: 'Wei Chen' }
    ];
    const groups = [
      { id: uid(), name: 'Math Group A', courseId: courses[0].id, studentIds: [students[0].id, students[1].id] },
      { id: uid(), name: 'Physics Eve',  courseId: courses[1].id, studentIds: [students[2].id, students[3].id] }
    ];
    const today = new Date().toISOString().slice(0,10);
    const attendance = [
      { id: uid(), date: today, groupId: groups[0].id, studentId: students[0].id, status: 'present' },
      { id: uid(), date: today, groupId: groups[0].id, studentId: students[1].id, status: 'absent'  }
    ];
    const payments = [
      { id: uid(), studentId: students[0].id, courseId: courses[0].id, amount: 120, date: today, status: 'paid' },
      { id: uid(), studentId: students[1].id, courseId: courses[0].id, amount: 120, date: today, status: 'pending' }
    ];
    const schedule = [
      { id: uid(), groupId: groups[0].id, day: 'Mon', time: '16:00', room: 'A1' },
      { id: uid(), groupId: groups[1].id, day: 'Tue', time: '18:00', room: 'B2' }
    ];
    write(KEYS.teachers, teachers);
    write(KEYS.courses, courses);
    write(KEYS.students, students);
    write(KEYS.groups, groups);
    write(KEYS.attendance, attendance);
    write(KEYS.payments, payments);
    write(KEYS.schedule, schedule);
    localStorage.setItem(KEYS.seeded, '1');
  }

  function crud(key) {
    return {
      all: () => read(key, []),
      get: (id) => read(key, []).find(x => x.id === id),
      add: (obj) => { const list = read(key, []); obj.id = obj.id || uid(); list.push(obj); write(key, list); return obj; },
      update: (id, patch) => {
        const list = read(key, []);
        const i = list.findIndex(x => x.id === id);
        if (i >= 0) { list[i] = Object.assign({}, list[i], patch); write(key, list); return list[i]; }
        return null;
      },
      remove: (id) => {
        const list = read(key, []).filter(x => x.id !== id); write(key, list);
      }
    };
  }

  global.DB = {
    KEYS,
    seed: seedIfNeeded,
    users: crud(KEYS.users),
    students: crud(KEYS.students),
    teachers: crud(KEYS.teachers),
    courses: crud(KEYS.courses),
    groups: crud(KEYS.groups),
    attendance: crud(KEYS.attendance),
    payments: crud(KEYS.payments),
    schedule: crud(KEYS.schedule),
    session: {
      get: () => read(KEYS.session, null),
      set: (s) => write(KEYS.session, s),
      clear: () => localStorage.removeItem(KEYS.session)
    },
    resetAll: () => { Object.values(KEYS).forEach(k => localStorage.removeItem(k)); seedIfNeeded(); }
  };

  seedIfNeeded();
})(window);

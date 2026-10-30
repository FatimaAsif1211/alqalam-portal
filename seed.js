const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');

// DNS Override (SRV issue fix)
dns.setServers(['8.8.8.8', '8.8.4.4']);
dns.setDefaultResultOrder('ipv4first');

dotenv.config();

// ═══════════════════════════════════════════════
// IMPORTS — 27 Models
// ═══════════════════════════════════════════════

// ═══ AUTH (4) ═══
const User = require('./models/auth/User');
const Role = require('./models/auth/Role');
const Session = require('./models/auth/Session');
const PasswordReset = require('./models/auth/PasswordReset');

// ═══ SCHOOL (6) ═══
const SchoolProfile = require('./models/school/SchoolProfile');
const AdmissionInformation = require('./models/school/AdmissionInformation');
const AcademicYear = require('./models/school/AcademicYear');
const Class = require('./models/school/Class');
const Section = require('./models/school/Section');
const Subject = require('./models/school/Subject');

// ═══ PEOPLE (5) ═══
const Student = require('./models/people/Student');
const Faculty = require('./models/people/Faculty');
const Parent = require('./models/people/Parent');
const Staff = require('./models/people/Staff');
const Attendance = require('./models/people/Attendance');

// ═══ LMS (2) ═══
const Course = require('./models/lms/Course');
const Material = require('./models/lms/Material');

// ═══ EXAMS (4) ═══
const Exam = require('./models/exams/Exam');
const ExamSchedule = require('./models/exams/ExamSchedule');
const Mark = require('./models/exams/Mark');
const GradeCard = require('./models/exams/GradeCard');

// ═══ CONTENT (5) ═══
const Announcement = require('./models/content/Announcement');
const Event = require('./models/content/Event');
const Gallery = require('./models/content/Gallery');
const ContactMessage = require('./models/content/ContactMessage');
const Notification = require('./models/content/Notification');

// ═══ MISC (1) ═══
const Setting = require('./models/misc/Setting');

// ═══════════════════════════════════════════════
// SEED FUNCTION
// ═══════════════════════════════════════════════

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected\n');

    // ═══════════════════════════════════════════
    // CLEAR OLD DATA
    // ═══════════════════════════════════════════
    console.log('🗑️  Clearing old data...');
    await Promise.all([
      User.deleteMany({}),
      Role.deleteMany({}),
      Session.deleteMany({}),
      PasswordReset.deleteMany({}),
      SchoolProfile.deleteMany({}),
      AdmissionInformation.deleteMany({}),
      AcademicYear.deleteMany({}),
      Class.deleteMany({}),
      Section.deleteMany({}),
      Subject.deleteMany({}),
      Student.deleteMany({}),
      Faculty.deleteMany({}),
      Parent.deleteMany({}),
      Staff.deleteMany({}),
      Attendance.deleteMany({}),
      Course.deleteMany({}),
      Material.deleteMany({}),
      Exam.deleteMany({}),
      ExamSchedule.deleteMany({}),
      Mark.deleteMany({}),
      GradeCard.deleteMany({}),
      Announcement.deleteMany({}),
      Event.deleteMany({}),
      Gallery.deleteMany({}),
      ContactMessage.deleteMany({}),
      Notification.deleteMany({}),
      Setting.deleteMany({})
    ]);
    console.log('✅ Old data cleared\n');

    // ═══════════════════════════════════════════
    // 1. AUTH (4)
    // ═══════════════════════════════════════════
    console.log('📝 Seeding Auth...');

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@alqalam.edu',
      passwordHash: 'admin123',
      role: 'admin',
      phone: '+92-300-1234567'
    });
    const teacher = await User.create({
      name: 'Prof. Muhammad Ahmed',
      email: 'teacher@alqalam.edu',
      passwordHash: 'teacher123',
      role: 'teacher',
      phone: '+92-300-1111111'
    });
    const student = await User.create({
      name: 'Ali Hassan',
      email: 'student@alqalam.edu',
      passwordHash: 'student123',
      role: 'student',
      phone: '+92-300-2222222'
    });
    const parent = await User.create({
      name: 'Muhammad Hassan',
      email: 'parent@alqalam.edu',
      passwordHash: 'parent123',
      role: 'parent',
      phone: '+92-300-3333333'
    });

    await Role.insertMany([
      { name: 'admin', description: 'Full system access', permissions: ['*'] },
      { name: 'teacher', description: 'Teaching staff', permissions: ['read:student', 'update:marks', 'create:assignment'] },
      { name: 'student', description: 'Student access', permissions: ['read:own'] },
      { name: 'parent', description: 'Parent access', permissions: ['read:child'] }
    ]);

    await Session.create({
      userId: admin._id,
      token: 'sample-jwt-token-' + Date.now(),
      ipAddress: '127.0.0.1',
      userAgent: 'Mozilla/5.0',
      expiresAt: new Date(Date.now() + 60 * 60 * 1000)
    });

    await PasswordReset.create({
      userId: student._id,
      token: 'reset-token-' + Date.now(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      used: false
    });
    console.log('  ✅ 4 Users, 4 Roles, 1 Session, 1 PasswordReset\n');

    // ═══════════════════════════════════════════
    // 2. SCHOOL (6)
    // ═══════════════════════════════════════════
    console.log('🏫 Seeding School...');

    await SchoolProfile.create({
      name: 'Al-Qalam Grammar School',
      campus: 'Muhammad Town Arifwala Campus',
      description: 'Al-Qalam Grammar School is a premier educational institution committed to academic excellence and character building.',
      mission: 'To provide quality education that nurtures intellectual, moral, and social development.',
      vision: 'To be a leading educational institution recognized for academic excellence and ethical values.',
      leadershipMessage: 'Welcome to Al-Qalam Grammar School. We are dedicated to shaping the future of our students.',
      address: 'Muhammad Town, Arifwala, Punjab, Pakistan',
      phone: '+92-300-1234567',
      email: 'info@alqalam.edu',
      timings: 'Monday to Saturday: 8:00 AM - 2:00 PM'
    });

    await AdmissionInformation.create({
      procedure: '1. Review admission information online. 2. Visit school office. 3. Submit required documents. 4. Complete admission formalities.',
      classesAvailable: ['Nursery', 'Prep', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
      eligibility: 'Age requirements as per class. Birth certificate required for verification.',
      requiredDocuments: ['Birth Certificate', 'Parent CNIC Copy', '4 Photographs'],
      schedule: 'Admissions open: March 1 - April 15',
      instructions: 'For queries, contact school office during working hours.'
    });

    const academicYear = await AcademicYear.create({
      name: '2026-2027',
      startDate: new Date('2026-04-01'),
      endDate: new Date('2027-03-31'),
      isActive: true,
      description: 'Current academic year'
    });

    const class1 = await Class.create({
      name: 'Class 1',
      description: 'Primary education',
      eligibility: 'Age 5+',
      academicYearId: academicYear._id,
      classTeacherId: teacher._id,
      capacity: 40,
      status: 'published'
    });

    const class2 = await Class.create({
      name: 'Class 2',
      description: 'Primary education',
      eligibility: 'Age 6+',
      academicYearId: academicYear._id,
      classTeacherId: teacher._id,
      capacity: 40,
      status: 'published'
    });

    const sectionA = await Section.create({
      classId: class1._id,
      name: 'A',
      classTeacherId: teacher._id,
      roomNumber: '101',
      capacity: 40,
      currentStrength: 1
    });

    const mathSubject = await Subject.create({
      name: 'Mathematics',
      code: 'MTH101',
      classId: class1._id,
      teacherId: teacher._id,
      totalMarks: 100,
      passingMarks: 40
    });

    const englishSubject = await Subject.create({
      name: 'English',
      code: 'ENG101',
      classId: class1._id,
      teacherId: teacher._id,
      totalMarks: 100,
      passingMarks: 40
    });

    const urduSubject = await Subject.create({
      name: 'Urdu',
      code: 'URD101',
      classId: class1._id,
      totalMarks: 100,
      passingMarks: 40
    });

    const islamiatSubject = await Subject.create({
      name: 'Islamiat',
      code: 'ISL101',
      classId: class1._id,
      totalMarks: 100,
      passingMarks: 40
    });
    console.log('  ✅ 1 Profile, 1 Admission, 1 Year, 2 Classes, 1 Section, 4 Subjects\n');

    // ═══════════════════════════════════════════
    // 3. PEOPLE (5)
    // ═══════════════════════════════════════════
    console.log('👥 Seeding People...');

    const studentRecord = await Student.create({
      userId: student._id,
      rollNumber: '2026-001',
      admissionNumber: 'ADM-2026-001',
      classId: class1._id,
      sectionId: sectionA._id,
      dateOfBirth: new Date('2020-05-15'),
      gender: 'male',
      bloodGroup: 'B+',
      guardianName: 'Muhammad Hassan',
      guardianPhone: '+92-300-3333333',
      guardianEmail: 'parent@alqalam.edu',
      parentId: parent._id,
      address: 'Muhammad Town, Arifwala',
      admissionDate: new Date('2026-04-01'),
      status: 'active'
    });

    await Faculty.create({
      userId: teacher._id,
      employeeId: 'EMP-001',
      designation: 'Senior Teacher',
      subjects: [mathSubject._id, englishSubject._id],
      qualification: 'M.Sc Mathematics, B.Ed',
      specialization: 'Mathematics',
      experience: 10,
      joiningDate: new Date('2016-04-01'),
      biography: 'Experienced mathematics teacher with 10 years of teaching.',
      status: 'published'
    });

    await Parent.create({
      userId: parent._id,
      occupation: 'Businessman',
      relationship: 'father',
      cnic: '35202-1234567-1',
      alternatePhone: '+92-300-4444444',
      studentIds: [studentRecord._id]
    });

    await Staff.create({
      userId: admin._id,
      employeeId: 'EMP-100',
      designation: 'Administrator',
      department: 'admin',
      joiningDate: new Date('2020-01-01'),
      salary: 50000,
      status: 'active'
    });

    await Attendance.create({
      studentId: studentRecord._id,
      classId: class1._id,
      sectionId: sectionA._id,
      date: new Date(),
      status: 'present',
      markedBy: teacher._id
    });
    console.log('  ✅ 1 Student, 1 Faculty, 1 Parent, 1 Staff, 1 Attendance\n');

    // ═══════════════════════════════════════════
    // 4. LMS (2)
    // ═══════════════════════════════════════════
    console.log('📚 Seeding LMS...');

    const course = await Course.create({
      name: 'Mathematics - Class 1',
      code: 'MTH101-C1',
      description: 'Basic mathematics for Class 1 students',
      classId: class1._id,
      subjectId: mathSubject._id,
      teacherId: teacher._id,
      status: 'published'
    });

    await Material.create({
      courseId: course._id,
      title: 'Numbers PDF',
      description: 'Printable worksheet for numbers 1-10',
      type: 'pdf',
      fileUrl: 'https://example.com/numbers.pdf',
      fileSize: 250000,
      uploadedBy: teacher._id
    });
    console.log('  ✅ 1 Course, 1 Material\n');

    // ═══════════════════════════════════════════
    // 5. EXAMS (4)
    // ═══════════════════════════════════════════
    console.log('📝 Seeding Exams...');

    const exam = await Exam.create({
      name: 'Mid Term 2026',
      term: 'mid',
      academicYearId: academicYear._id,
      startDate: new Date('2026-10-01'),
      endDate: new Date('2026-10-15'),
      classIds: [class1._id, class2._id],
      status: 'scheduled',
      createdBy: admin._id
    });

    await ExamSchedule.create({
      examId: exam._id,
      classId: class1._id,
      subjectId: mathSubject._id,
      date: new Date('2026-10-05'),
      startTime: '09:00',
      endTime: '11:00',
      room: '101',
      totalMarks: 100
    });

    await Mark.create({
      studentId: studentRecord._id,
      examId: exam._id,
      subjectId: mathSubject._id,
      marksObtained: 85,
      totalMarks: 100,
      grade: 'A',
      enteredBy: teacher._id
    });

    await GradeCard.create({
      studentId: studentRecord._id,
      examId: exam._id,
      subjects: [
        {
          subjectId: mathSubject._id,
          subjectName: 'Mathematics',
          marksObtained: 85,
          totalMarks: 100,
          grade: 'A'
        },
        {
          subjectId: englishSubject._id,
          subjectName: 'English',
          marksObtained: 78,
          totalMarks: 100,
          grade: 'B'
        },
        {
          subjectId: urduSubject._id,
          subjectName: 'Urdu',
          marksObtained: 82,
          totalMarks: 100,
          grade: 'A'
        },
        {
          subjectId: islamiatSubject._id,
          subjectName: 'Islamiat',
          marksObtained: 90,
          totalMarks: 100,
          grade: 'A+'
        }
      ],
      totalMarksObtained: 335,
      totalMaxMarks: 400,
      percentage: 83.75,
      grade: 'A',
      position: 1,
      remarks: 'Excellent performance'
    });
    console.log('  ✅ 1 Exam, 1 Schedule, 1 Mark, 1 GradeCard\n');

    // ═══════════════════════════════════════════
    // 6. CONTENT (5)
    // ═══════════════════════════════════════════
    console.log('📢 Seeding Content...');

    await Announcement.create({
      title: 'Parent-Teacher Meeting',
      description: 'PTM scheduled for October 25, 2026. All parents are requested to attend.',
      publishDate: new Date(),
      status: 'published',
      category: 'general',
      targetRoles: ['parent', 'teacher'],
      createdBy: admin._id
    });

    const event = await Event.create({
      title: 'Annual Prize Distribution',
      description: 'Annual prize distribution ceremony for top students.',
      date: new Date('2026-12-15'),
      endDate: new Date('2026-12-15'),
      location: 'School Main Hall',
      status: 'published',
      category: 'academic',
      createdBy: admin._id
    });

    await Gallery.create({
      title: 'Prize Distribution 2025',
      imageUrl: 'https://via.placeholder.com/800x600',
      category: 'prize',
      eventId: event._id,
      status: 'published',
      uploadedBy: admin._id
    });

    await ContactMessage.create({
      name: 'Ahmed Khan',
      email: 'ahmed@example.com',
      phone: '+92-300-5555555',
      subject: 'Admission Inquiry',
      message: 'I want to know about admission procedure for my son.',
      isRead: false
    });

    await Notification.create({
      userId: student._id,
      title: 'Welcome to Portal',
      message: 'Welcome to Al-Qalam Grammar School portal',
      type: 'general',
      isRead: false
    });
    console.log('  ✅ 1 Announcement, 1 Event, 1 Gallery, 1 Message, 1 Notification\n');

    // ═══════════════════════════════════════════
    // 7. MISC (1)
    // ═══════════════════════════════════════════
    console.log('⚙️  Seeding Misc...');

    await Setting.insertMany([
      { key: 'school_name', value: 'Al-Qalam Grammar School', category: 'general', description: 'School name' },
      { key: 'academic_year', value: '2026-2027', category: 'academic', description: 'Current academic year' },
      { key: 'session_timeout', value: 60, category: 'security', description: 'Session timeout in minutes' }
    ]);
    console.log('  ✅ 3 Settings\n');

    // ═══════════════════════════════════════════
    // SUCCESS
    // ═══════════════════════════════════════════
    console.log('═══════════════════════════════════════════');
    console.log('🎉 ALL 27 COLLECTIONS SEEDED SUCCESSFULLY!');
    console.log('═══════════════════════════════════════════');
    console.log('\n🔑 Login Credentials:');
    console.log('   Admin:   admin@alqalam.edu / admin123');
    console.log('   Teacher: teacher@alqalam.edu / teacher123');
    console.log('   Student: student@alqalam.edu / student123');
    console.log('   Parent:  parent@alqalam.edu / parent123');
    console.log('\n📊 Open MongoDB Atlas to see all 27 collections');
    console.log('═══════════════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seed Error:', error.message);
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();
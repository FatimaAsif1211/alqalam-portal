const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');

dotenv.config();

// Force Google DNS (SRV issue fix)
dns.setServers(['8.8.8.8', '8.8.4.4']);
dns.setDefaultResultOrder('ipv4first');

// ═══════════════════════════════════════════════
// IMPORTS — All 41 Models
// ═══════════════════════════════════════════════

// Auth (4)
const User = require('./models/auth/User');
const Role = require('./models/auth/Role');
const Session = require('./models/auth/Session');
const PasswordReset = require('./models/auth/PasswordReset');

// School (6)
const SchoolProfile = require('./models/school/SchoolProfile');
const AdmissionInformation = require('./models/school/AdmissionInformation');
const AcademicYear = require('./models/school/AcademicYear');
const Class = require('./models/school/Class');
const Section = require('./models/school/Section');
const Subject = require('./models/school/Subject');

// People (5)
const Student = require('./models/people/Student');
const Faculty = require('./models/people/Faculty');
const Parent = require('./models/people/Parent');
const Staff = require('./models/people/Staff');
const Attendance = require('./models/people/Attendance');

// LMS (7)
const Course = require('./models/lms/Course');
const Lesson = require('./models/lms/Lesson');
const Material = require('./models/lms/Material');
const Assignment = require('./models/lms/Assignment');
const Submission = require('./models/lms/Submission');
const Quiz = require('./models/lms/Quiz');
const Discussion = require('./models/lms/Discussion');

// Exams (5)
const Exam = require('./models/exams/Exam');
const ExamSchedule = require('./models/exams/ExamSchedule');
const Mark = require('./models/exams/Mark');
const GradeCard = require('./models/exams/GradeCard');
const GradingScale = require('./models/exams/GradingScale');

// Fees (3)
const FeeStructure = require('./models/fees/FeeStructure');
const FeeVoucher = require('./models/fees/FeeVoucher');
const Payment = require('./models/fees/Payment');

// Library (2)
const Book = require('./models/library/Book');
const BookIssue = require('./models/library/BookIssue');

// Content (5)
const Announcement = require('./models/content/Announcement');
const Event = require('./models/content/Event');
const Gallery = require('./models/content/Gallery');
const ContactMessage = require('./models/content/ContactMessage');
const Notification = require('./models/content/Notification');

// Misc (4)
const Setting = require('./models/misc/Setting');
const AuditLog = require('./models/misc/AuditLog');
const Upload = require('./models/misc/Upload');
const Timetable = require('./models/misc/Timetable');

// ═══════════════════════════════════════════════
// SEED FUNCTION
// ═══════════════════════════════════════════════

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    // ═══════════════════════════════════════════
    // CLEAR EXISTING DATA
    // ═══════════════════════════════════════════
    console.log('\n🗑️  Clearing old data...');
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
      Lesson.deleteMany({}),
      Material.deleteMany({}),
      Assignment.deleteMany({}),
      Submission.deleteMany({}),
      Quiz.deleteMany({}),
      Discussion.deleteMany({}),
      Exam.deleteMany({}),
      ExamSchedule.deleteMany({}),
      Mark.deleteMany({}),
      GradeCard.deleteMany({}),
      GradingScale.deleteMany({}),
      FeeStructure.deleteMany({}),
      FeeVoucher.deleteMany({}),
      Payment.deleteMany({}),
      Book.deleteMany({}),
      BookIssue.deleteMany({}),
      Announcement.deleteMany({}),
      Event.deleteMany({}),
      Gallery.deleteMany({}),
      ContactMessage.deleteMany({}),
      Notification.deleteMany({}),
      Setting.deleteMany({}),
      AuditLog.deleteMany({}),
      Upload.deleteMany({}),
      Timetable.deleteMany({})
    ]);
    console.log('✅ Old data cleared');

    // ═══════════════════════════════════════════
    // 1. AUTH
    // ═══════════════════════════════════════════
    console.log('\n📝 Seeding Auth...');

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@alqalam.edu',
      passwordHash: 'admin123',
      role: 'admin',
      phone: '+92-300-1234567'
    });
    console.log('  ✅ Admin created:', admin.email);

    const teacher = await User.create({
      name: 'Prof. Muhammad Ahmed',
      email: 'teacher@alqalam.edu',
      passwordHash: 'teacher123',
      role: 'teacher',
      phone: '+92-300-1111111'
    });
    console.log('  ✅ Teacher created:', teacher.email);

    const student = await User.create({
      name: 'Ali Hassan',
      email: 'student@alqalam.edu',
      passwordHash: 'student123',
      role: 'student',
      phone: '+92-300-2222222'
    });
    console.log('  ✅ Student user created:', student.email);

    await Role.insertMany([
      { name: 'admin', description: 'Full access', permissions: ['*'] },
      { name: 'teacher', description: 'Teaching staff', permissions: ['read:student', 'update:marks'] },
      { name: 'student', description: 'Student access', permissions: ['read:own'] },
      { name: 'parent', description: 'Parent access', permissions: ['read:child'] }
    ]);
    console.log('  ✅ 4 Roles created');

    // ═══════════════════════════════════════════
    // 2. SCHOOL
    // ═══════════════════════════════════════════
    console.log('\n🏫 Seeding School...');

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
    console.log('  ✅ SchoolProfile created');

    await AdmissionInformation.create({
      procedure: '1. Review admission information online. 2. Visit school office. 3. Submit required documents. 4. Complete admission formalities.',
      classesAvailable: ['Nursery', 'Prep', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
      eligibility: 'Age requirements as per class. Birth certificate required.',
      requiredDocuments: ['Birth Certificate', 'Parent CNIC Copy', '4 Photographs'],
      schedule: 'Admissions open: March 1 - April 15',
      instructions: 'For queries, contact school office during working hours.'
    });
    console.log('  ✅ AdmissionInformation created');

    const academicYear = await AcademicYear.create({
      name: '2026-2027',
      startDate: new Date('2026-04-01'),
      endDate: new Date('2027-03-31'),
      isActive: true,
      description: 'Current academic year'
    });
    console.log('  ✅ AcademicYear created:', academicYear.name);

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
      capacity: 40,
      status: 'published'
    });
    console.log('  ✅ 2 Classes created');

    const sectionA = await Section.create({
      classId: class1._id,
      name: 'A',
      classTeacherId: teacher._id,
      roomNumber: '101',
      capacity: 40,
      currentStrength: 1
    });
    console.log('  ✅ Section A created');

    await Subject.insertMany([
      { name: 'English', code: 'ENG101', classId: class1._id, teacherId: teacher._id, totalMarks: 100, passingMarks: 40 },
      { name: 'Urdu', code: 'URD101', classId: class1._id, totalMarks: 100, passingMarks: 40 },
      { name: 'Mathematics', code: 'MTH101', classId: class1._id, teacherId: teacher._id, totalMarks: 100, passingMarks: 40 },
      { name: 'Islamiat', code: 'ISL101', classId: class1._id, totalMarks: 100, passingMarks: 40 }
    ]);
    console.log('  ✅ 4 Subjects created');

    // ═══════════════════════════════════════════
    // 3. PEOPLE
    // ═══════════════════════════════════════════
    console.log('\n👥 Seeding People...');

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
      address: 'Muhammad Town, Arifwala',
      admissionDate: new Date('2026-04-01'),
      status: 'active'
    });
    console.log('  ✅ Student created:', studentRecord.rollNumber);

    await Faculty.create({
      userId: teacher._id,
      employeeId: 'EMP-001',
      designation: 'Senior Teacher',
      qualification: 'M.Sc Mathematics, B.Ed',
      specialization: 'Mathematics',
      experience: 10,
      joiningDate: new Date('2016-04-01'),
      biography: 'Experienced mathematics teacher with 10 years of teaching.',
      status: 'published'
    });
    console.log('  ✅ Faculty created');

    await Staff.create({
      userId: admin._id,
      employeeId: 'EMP-100',
      designation: 'Administrator',
      department: 'admin',
      joiningDate: new Date('2020-01-01'),
      salary: 50000,
      status: 'active'
    });
    console.log('  ✅ Staff created');

    await Attendance.create({
      studentId: studentRecord._id,
      classId: class1._id,
      sectionId: sectionA._id,
      date: new Date(),
      status: 'present',
      markedBy: teacher._id
    });
    console.log('  ✅ Attendance created');

    // ═══════════════════════════════════════════
    // 4. LMS
    // ═══════════════════════════════════════════
    console.log('\n📚 Seeding LMS...');

    const mathSubject = await Subject.findOne({ code: 'MTH101' });
    const engSubject = await Subject.findOne({ code: 'ENG101' });

    const course = await Course.create({
      name: 'Mathematics - Class 1',
      code: 'MTH101-C1',
      description: 'Basic mathematics for Class 1 students',
      classId: class1._id,
      subjectId: mathSubject._id,
      teacherId: teacher._id,
      status: 'published'
    });
    console.log('  ✅ Course created:', course.name);

    await Lesson.create({
      courseId: course._id,
      title: 'Numbers 1-10',
      content: 'Introduction to numbers from 1 to 10.',
      order: 1,
      isPublished: true
    });
    console.log('  ✅ Lesson created');

    await Material.create({
      courseId: course._id,
      title: 'Numbers PDF',
      description: 'Printable worksheet',
      type: 'pdf',
      fileUrl: 'https://example.com/numbers.pdf',
      uploadedBy: teacher._id
    });
    console.log('  ✅ Material created');

    const assignment = await Assignment.create({
      courseId: course._id,
      title: 'Write Numbers 1-10',
      description: 'Write numbers 1 to 10 in your notebook.',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      totalMarks: 10,
      passingMarks: 4,
      createdBy: teacher._id,
      isPublished: true
    });
    console.log('  ✅ Assignment created');

    await Submission.create({
      assignmentId: assignment._id,
      studentId: studentRecord._id,
      content: 'Done in notebook',
      submittedAt: new Date(),
      status: 'submitted'
    });
    console.log('  ✅ Submission created');

    await Quiz.create({
      courseId: course._id,
      title: 'Numbers Quiz',
      description: 'Quick quiz on numbers',
      questions: [
        { question: 'What comes after 5?', type: 'mcq', options: ['4', '6', '7'], correctAnswer: '6', marks: 1 },
        { question: 'What is 2+2?', type: 'mcq', options: ['3', '4', '5'], correctAnswer: '4', marks: 1 }
      ],
      duration: 10,
      totalMarks: 2,
      passingMarks: 1,
      createdBy: teacher._id,
      isPublished: true
    });
    console.log('  ✅ Quiz created');

    await Discussion.create({
      courseId: course._id,
      title: 'Welcome to Mathematics',
      description: 'Introduce yourself',
      createdBy: teacher._id
    });
    console.log('  ✅ Discussion created');

    // ═══════════════════════════════════════════
    // 5. EXAMS
    // ═══════════════════════════════════════════
    console.log('\n📝 Seeding Exams...');

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
    console.log('  ✅ Exam created:', exam.name);

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
    console.log('  ✅ ExamSchedule created');

    await Mark.create({
      studentId: studentRecord._id,
      examId: exam._id,
      subjectId: mathSubject._id,
      marksObtained: 85,
      totalMarks: 100,
      grade: 'A',
      enteredBy: teacher._id
    });
    console.log('  ✅ Mark created');

    await GradeCard.create({
      studentId: studentRecord._id,
      examId: exam._id,
      subjects: [{
        subjectId: mathSubject._id,
        subjectName: 'Mathematics',
        marksObtained: 85,
        totalMarks: 100,
        grade: 'A'
      }],
      totalMarksObtained: 85,
      totalMaxMarks: 100,
      percentage: 85,
      grade: 'A',
      position: 1
    });
    console.log('  ✅ GradeCard created');

    await GradingScale.create({
      name: 'Standard Grading',
      grades: [
        { grade: 'A+', minPercentage: 90, maxPercentage: 100, remarks: 'Excellent' },
        { grade: 'A', minPercentage: 80, maxPercentage: 89, remarks: 'Very Good' },
        { grade: 'B', minPercentage: 70, maxPercentage: 79, remarks: 'Good' },
        { grade: 'C', minPercentage: 60, maxPercentage: 69, remarks: 'Average' },
        { grade: 'D', minPercentage: 50, maxPercentage: 59, remarks: 'Pass' },
        { grade: 'F', minPercentage: 0, maxPercentage: 49, remarks: 'Fail' }
      ],
      isActive: true
    });
    console.log('  ✅ GradingScale created');

    // ═══════════════════════════════════════════
    // 6. FEES
    // ═══════════════════════════════════════════
    console.log('\n💰 Seeding Fees...');

    await FeeStructure.create({
      classId: class1._id,
      academicYearId: academicYear._id,
      tuitionFee: 3000,
      admissionFee: 5000,
      examFee: 500,
      totalMonthly: 3500,
      isActive: true
    });
    console.log('  ✅ FeeStructure created');

    const voucher = await FeeVoucher.create({
      studentId: studentRecord._id,
      classId: class1._id,
      academicYearId: academicYear._id,
      month: 10,
      year: 2026,
      voucherNumber: 'VCH-2026-10-001',
      items: [{ description: 'Tuition Fee', amount: 3000 }, { description: 'Exam Fee', amount: 500 }],
      totalAmount: 3500,
      netAmount: 3500,
      dueDate: new Date('2026-10-10'),
      status: 'unpaid',
      generatedBy: admin._id
    });
    console.log('  ✅ FeeVoucher created:', voucher.voucherNumber);

    await Payment.create({
      voucherId: voucher._id,
      studentId: studentRecord._id,
      amount: 3500,
      method: 'cash',
      receiptNumber: 'RCP-2026-001',
      receivedBy: admin._id
    });
    console.log('  ✅ Payment created');

    // ═══════════════════════════════════════════
    // 7. LIBRARY
    // ═══════════════════════════════════════════
    console.log('\n📖 Seeding Library...');

    const book = await Book.create({
      title: 'Mathematics for Class 1',
      author: 'Oxford Publishers',
      category: 'math',
      totalCopies: 10,
      availableCopies: 9,
      shelfNumber: 'A-101'
    });
    console.log('  ✅ Book created:', book.title);

    await BookIssue.create({
      bookId: book._id,
      studentId: studentRecord._id,
      issuedBy: admin._id,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      status: 'issued'
    });
    console.log('  ✅ BookIssue created');

    // ═══════════════════════════════════════════
    // 8. CONTENT
    // ═══════════════════════════════════════════
    console.log('\n📢 Seeding Content...');

    await Announcement.create({
      title: 'Parent-Teacher Meeting',
      description: 'PTM scheduled for October 25, 2026.',
      publishDate: new Date(),
      status: 'published',
      category: 'general',
      createdBy: admin._id
    });
    console.log('  ✅ Announcement created');

    const event = await Event.create({
      title: 'Annual Prize Distribution',
      description: 'Annual prize distribution ceremony.',
      date: new Date('2026-12-15'),
      location: 'School Main Hall',
      status: 'published',
      category: 'academic',
      createdBy: admin._id
    });
    console.log('  ✅ Event created');

    await Gallery.create({
      title: 'Prize Distribution 2025',
      imageUrl: 'https://via.placeholder.com/800x600',
      category: 'prize',
      eventId: event._id,
      status: 'published',
      uploadedBy: admin._id
    });
    console.log('  ✅ Gallery image created');

    await ContactMessage.create({
      name: 'Ahmed Khan',
      email: 'ahmed@example.com',
      phone: '+92-300-1234567',
      subject: 'Admission Inquiry',
      message: 'I want to know about admission procedure for my son.',
      isRead: false
    });
    console.log('  ✅ ContactMessage created');

    await Notification.create({
      userId: student._id,
      title: 'New Assignment',
      message: 'You have a new assignment: Write Numbers 1-10',
      type: 'assignment',
      isRead: false
    });
    console.log('  ✅ Notification created');

    // ═══════════════════════════════════════════
    // 9. MISC
    // ═══════════════════════════════════════════
    console.log('\n⚙️  Seeding Misc...');

    await Setting.insertMany([
      { key: 'school_name', value: 'Al-Qalam Grammar School', category: 'general' },
      { key: 'academic_year', value: '2026-2027', category: 'academic' },
      { key: 'session_timeout', value: 60, category: 'security' }
    ]);
    console.log('  ✅ 3 Settings created');

    await AuditLog.create({
      userId: admin._id,
      action: 'login',
      entity: 'User',
      entityId: admin._id,
      description: 'Admin logged in',
      ipAddress: '127.0.0.1',
      status: 'success'
    });
    console.log('  ✅ AuditLog created');

    await Upload.create({
      uploadedBy: admin._id,
      fileName: 'school-logo.png',
      originalName: 'logo.png',
      fileUrl: 'https://example.com/logo.png',
      fileType: 'image/png',
      fileSize: 50000,
      category: 'profile',
      cloudProvider: 'cloudinary'
    });
    console.log('  ✅ Upload created');

    await Timetable.create({
      classId: class1._id,
      sectionId: sectionA._id,
      academicYearId: academicYear._id,
      dayOfWeek: 'monday',
      periods: [
        { periodNumber: 1, subjectId: engSubject._id, startTime: '08:00', endTime: '08:45' },
        { periodNumber: 2, subjectId: mathSubject._id, startTime: '08:45', endTime: '09:30' }
      ],
      createdBy: admin._id
    });
    console.log('  ✅ Timetable created');

    // ═══════════════════════════════════════════
    // SUCCESS
    // ═══════════════════════════════════════════
    console.log('\n═══════════════════════════════════════════');
    console.log('🎉 ALL 41 COLLECTIONS SEEDED SUCCESSFULLY!');
    console.log('═══════════════════════════════════════════');
    console.log('\n🔑 Login Credentials:');
    console.log('   Admin:   admin@alqalam.edu / admin123');
    console.log('   Teacher: teacher@alqalam.edu / teacher123');
    console.log('   Student: student@alqalam.edu / student123');
    console.log('\n📊 Open MongoDB Atlas to see all collections');
    console.log('═══════════════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seed Error:', error.message);
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();
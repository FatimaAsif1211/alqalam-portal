const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');

dotenv.config();
dns.setServers(['8.8.8.8', '8.8.4.4']);
dns.setDefaultResultOrder('ipv4first');

const User = require('./models/auth/User');
const Role = require('./models/auth/Role');
const Session = require('./models/auth/Session');
const PasswordReset = require('./models/auth/PasswordReset');

const SchoolProfile = require('./models/school/SchoolProfile');
const AdmissionInformation = require('./models/school/AdmissionInformation');
const AcademicYear = require('./models/school/AcademicYear');
const Class = require('./models/school/Class');
const Section = require('./models/school/Section');
const Subject = require('./models/school/Subject');

const Student = require('./models/people/Student');
const Faculty = require('./models/people/Faculty');
const Parent = require('./models/people/Parent');
const Staff = require('./models/people/Staff');
const Attendance = require('./models/people/Attendance');

const Course = require('./models/lms/Course');
const Lesson = require('./models/lms/Lesson');
const Material = require('./models/lms/Material');
const Assignment = require('./models/lms/Assignment');
const Submission = require('./models/lms/Submission');
const Quiz = require('./models/lms/Quiz');
const Discussion = require('./models/lms/Discussion');

const Exam = require('./models/exams/Exam');
const ExamSchedule = require('./models/exams/ExamSchedule');
const Mark = require('./models/exams/Mark');
const GradeCard = require('./models/exams/GradeCard');
const GradingScale = require('./models/exams/GradingScale');

const FeeStructure = require('./models/fees/FeeStructure');
const FeeVoucher = require('./models/fees/FeeVoucher');
const Payment = require('./models/fees/Payment');

const Book = require('./models/library/Book');
const BookIssue = require('./models/library/BookIssue');

const Announcement = require('./models/content/Announcement');
const Event = require('./models/content/Event');
const Gallery = require('./models/content/Gallery');
const ContactMessage = require('./models/content/ContactMessage');
const Notification = require('./models/content/Notification');

const Setting = require('./models/misc/Setting');
const AuditLog = require('./models/misc/AuditLog');
const Upload = require('./models/misc/Upload');
const Timetable = require('./models/misc/Timetable');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    console.log('Clearing old data...');
    await User.deleteMany({});
    await Role.deleteMany({});
    await Session.deleteMany({});
    await PasswordReset.deleteMany({});
    await SchoolProfile.deleteMany({});
    await AdmissionInformation.deleteMany({});
    await AcademicYear.deleteMany({});
    await Class.deleteMany({});
    await Section.deleteMany({});
    await Subject.deleteMany({});
    await Student.deleteMany({});
    await Faculty.deleteMany({});
    await Parent.deleteMany({});
    await Staff.deleteMany({});
    await Attendance.deleteMany({});
    await Course.deleteMany({});
    await Lesson.deleteMany({});
    await Material.deleteMany({});
    await Assignment.deleteMany({});
    await Submission.deleteMany({});
    await Quiz.deleteMany({});
    await Discussion.deleteMany({});
    await Exam.deleteMany({});
    await ExamSchedule.deleteMany({});
    await Mark.deleteMany({});
    await GradeCard.deleteMany({});
    await GradingScale.deleteMany({});
    await FeeStructure.deleteMany({});
    await FeeVoucher.deleteMany({});
    await Payment.deleteMany({});
    await Book.deleteMany({});
    await BookIssue.deleteMany({});
    await Announcement.deleteMany({});
    await Event.deleteMany({});
    await Gallery.deleteMany({});
    await ContactMessage.deleteMany({});
    await Notification.deleteMany({});
    await Setting.deleteMany({});
    await AuditLog.deleteMany({});
    await Upload.deleteMany({});
    await Timetable.deleteMany({});
    console.log('Old data cleared');

    console.log('Seeding Auth...');
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
    await Role.insertMany([
      { name: 'admin', description: 'Full access', permissions: ['*'] },
      { name: 'teacher', description: 'Teaching staff', permissions: ['read:student'] },
      { name: 'student', description: 'Student access', permissions: ['read:own'] },
      { name: 'parent', description: 'Parent access', permissions: ['read:child'] }
    ]);
    console.log('Auth seeded');

    console.log('Seeding School...');
    await SchoolProfile.create({
      name: 'Al-Qalam Grammar School',
      campus: 'Muhammad Town Arifwala Campus',
      description: 'Al-Qalam Grammar School is a premier educational institution.',
      mission: 'To provide quality education.',
      vision: 'To be a leading institution.',
      leadershipMessage: 'Welcome to Al-Qalam Grammar School.',
      address: 'Muhammad Town, Arifwala, Punjab, Pakistan',
      phone: '+92-300-1234567',
      email: 'info@alqalam.edu',
      timings: 'Monday to Saturday: 8:00 AM - 2:00 PM'
    });
    await AdmissionInformation.create({
      procedure: '1. Review online. 2. Visit office. 3. Submit documents. 4. Complete formalities.',
      classesAvailable: ['Nursery', 'Prep', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
      eligibility: 'Age requirements as per class.',
      requiredDocuments: ['Birth Certificate', 'Parent CNIC Copy', '4 Photographs'],
      schedule: 'Admissions open: March 1 - April 15',
      instructions: 'For queries, contact school office.'
    });
    const academicYear = await AcademicYear.create({
      name: '2026-2027',
      startDate: new Date('2026-04-01'),
      endDate: new Date('2027-03-31'),
      isActive: true
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
    await Subject.insertMany([
      { name: 'English', code: 'ENG101', classId: class1._id, teacherId: teacher._id },
      { name: 'Urdu', code: 'URD101', classId: class1._id },
      { name: 'Mathematics', code: 'MTH101', classId: class1._id, teacherId: teacher._id },
      { name: 'Islamiat', code: 'ISL101', classId: class1._id }
    ]);
    console.log('School seeded');

    console.log('Seeding People...');
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
    await Faculty.create({
      userId: teacher._id,
      employeeId: 'EMP-001',
      designation: 'Senior Teacher',
      qualification: 'M.Sc Mathematics, B.Ed',
      specialization: 'Mathematics',
      experience: 10,
      joiningDate: new Date('2016-04-01'),
      status: 'published'
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
    console.log('People seeded');

    console.log('Seeding LMS...');
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
    await Lesson.create({
      courseId: course._id,
      title: 'Numbers 1-10',
      content: 'Introduction to numbers.',
      order: 1,
      isPublished: true
    });
    await Material.create({
      courseId: course._id,
      title: 'Numbers PDF',
      description: 'Worksheet',
      type: 'pdf',
      fileUrl: 'https://example.com/numbers.pdf',
      uploadedBy: teacher._id
    });
    const assignment = await Assignment.create({
      courseId: course._id,
      title: 'Write Numbers 1-10',
      description: 'Write numbers in notebook.',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      totalMarks: 10,
      passingMarks: 4,
      createdBy: teacher._id,
      isPublished: true
    });
    await Submission.create({
      assignmentId: assignment._id,
      studentId: studentRecord._id,
      content: 'Done',
      status: 'submitted'
    });
    await Quiz.create({
      courseId: course._id,
      title: 'Numbers Quiz',
      description: 'Quick quiz',
      questions: [
        { question: 'What is 2+2?', type: 'mcq', options: ['3', '4', '5'], correctAnswer: '4', marks: 1 }
      ],
      duration: 10,
      totalMarks: 1,
      passingMarks: 1,
      createdBy: teacher._id,
      isPublished: true
    });
    await Discussion.create({
      courseId: course._id,
      title: 'Welcome',
      description: 'Introduce yourself',
      createdBy: teacher._id
    });
    console.log('LMS seeded');

    console.log('Seeding Exams...');
    const exam = await Exam.create({
      name: 'Mid Term 2026',
      term: 'mid',
      academicYearId: academicYear._id,
      startDate: new Date('2026-10-01'),
      endDate: new Date('2026-10-15'),
      classIds: [class1._id],
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
    await GradingScale.create({
      name: 'Standard Grading',
      grades: [
        { grade: 'A', minPercentage: 80, maxPercentage: 100, remarks: 'Very Good' },
        { grade: 'B', minPercentage: 70, maxPercentage: 79, remarks: 'Good' },
        { grade: 'C', minPercentage: 60, maxPercentage: 69, remarks: 'Average' }
      ],
      isActive: true
    });
    console.log('Exams seeded');

    console.log('Seeding Fees...');
    await FeeStructure.create({
      classId: class1._id,
      academicYearId: academicYear._id,
      tuitionFee: 3000,
      admissionFee: 5000,
      examFee: 500,
      totalMonthly: 3500,
      isActive: true
    });
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
    await Payment.create({
      voucherId: voucher._id,
      studentId: studentRecord._id,
      amount: 3500,
      method: 'cash',
      receiptNumber: 'RCP-2026-001',
      receivedBy: admin._id
    });
    console.log('Fees seeded');

    console.log('Seeding Library...');
    const book = await Book.create({
      title: 'Mathematics for Class 1',
      author: 'Oxford Publishers',
      category: 'math',
      totalCopies: 10,
      availableCopies: 9,
      shelfNumber: 'A-101'
    });
    await BookIssue.create({
      bookId: book._id,
      studentId: studentRecord._id,
      issuedBy: admin._id,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      status: 'issued'
    });
    console.log('Library seeded');

    console.log('Seeding Content...');
    await Announcement.create({
      title: 'Parent-Teacher Meeting',
      description: 'PTM scheduled for October 25, 2026.',
      publishDate: new Date(),
      status: 'published',
      category: 'general',
      createdBy: admin._id
    });
    const event = await Event.create({
      title: 'Annual Prize Distribution',
      description: 'Annual prize distribution ceremony.',
      date: new Date('2026-12-15'),
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
      phone: '+92-300-1234567',
      subject: 'Admission Inquiry',
      message: 'I want to know about admission procedure.',
      isRead: false
    });
    await Notification.create({
      userId: student._id,
      title: 'New Assignment',
      message: 'You have a new assignment.',
      type: 'assignment',
      isRead: false
    });
    console.log('Content seeded');

    console.log('Seeding Misc...');
    await Setting.insertMany([
      { key: 'school_name', value: 'Al-Qalam Grammar School', category: 'general' },
      { key: 'academic_year', value: '2026-2027', category: 'academic' }
    ]);
    await AuditLog.create({
      userId: admin._id,
      action: 'login',
      entity: 'User',
      entityId: admin._id,
      description: 'Admin logged in',
      ipAddress: '127.0.0.1',
      status: 'success'
    });
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
    console.log('Misc seeded');

    console.log('');
    console.log('=========================================');
    console.log('ALL 41 COLLECTIONS SEEDED SUCCESSFULLY!');
    console.log('=========================================');
    console.log('');
    console.log('Login Credentials:');
    console.log('  Admin:   admin@alqalam.edu / admin123');
    console.log('  Teacher: teacher@alqalam.edu / teacher123');
    console.log('  Student: student@alqalam.edu / student123');
    console.log('');
    console.log('Open MongoDB Atlas to see all collections');
    console.log('=========================================');

    process.exit(0);
  } catch (error) {
    console.error('');
    console.error('SEED ERROR:', error.message);
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();
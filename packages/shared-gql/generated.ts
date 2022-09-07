import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
};

export enum AcceptableAgeGroup {
  Adult = 'Adult',
  Both = 'Both',
  Child = 'Child'
}

export type Admin = {
  __typename?: 'Admin';
  _id: Scalars['String'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  passwordHASH: Scalars['String'];
  phoneNumber: Scalars['String'];
  token?: Maybe<Scalars['String']>;
};

export enum AllowedDoctorLanguageTypes {
  Basic = 'Basic',
  First = 'First',
  Fluently = 'Fluently'
}

export enum AllowedDoctorLanguages {
  English = 'English',
  German = 'German',
  Kazakh = 'Kazakh',
  Russian = 'Russian',
  Turkish = 'Turkish'
}

export enum AllowedExperienceAndEducationTypes {
  Education = 'Education',
  Experience = 'Experience'
}

export enum AllowedGraphTypes {
  Money = 'Money',
  People = 'people'
}

export enum AllowedPeriodsOfTime {
  Month = 'Month',
  Year = 'Year'
}

export enum AllowedRhFactorTypes {
  Negative = 'Negative',
  Positive = 'Positive'
}

export type AppointmentBlankGraph = {
  __typename?: 'AppointmentBlankGraph';
  _id: Scalars['String'];
  appointmentResults?: Maybe<Array<AppointmentResults>>;
  complaint?: Maybe<Complain>;
  createdAt: Scalars['DateTime'];
  diagnose?: Maybe<Diagnose>;
  inspections?: Maybe<Array<Inspections>>;
  owners: Array<AppointmentBlankOwnersGraph>;
  treatmentPlan?: Maybe<TreatmentPlanGraph>;
  user?: Maybe<User>;
  userId: Scalars['String'];
};

export type AppointmentBlankOwnersGraph = {
  __typename?: 'AppointmentBlankOwnersGraph';
  addedByDoctor?: Maybe<Doctor>;
  addedByDoctorId?: Maybe<Scalars['String']>;
  doctor?: Maybe<Doctor>;
  doctorId?: Maybe<Scalars['String']>;
  service?: Maybe<Service>;
  serviceId: Scalars['String'];
  session?: Maybe<Session>;
  sessionId?: Maybe<Scalars['String']>;
};

export type AppointmentResults = {
  __typename?: 'AppointmentResults';
  _id: Scalars['String'];
  description: Scalars['String'];
  doctor?: Maybe<Doctor>;
  doctorId: Scalars['String'];
  photoURL?: Maybe<PhotoUrl>;
  user?: Maybe<User>;
};

export type Booking = {
  __typename?: 'Booking';
  _id: Scalars['String'];
  doctor?: Maybe<Doctor>;
  endDate: Scalars['DateTime'];
  price: Scalars['Float'];
  progress: BookingProgress;
  service?: Maybe<Service>;
  startDate: Scalars['DateTime'];
  user: User;
};

export enum BookingProgress {
  Canceled = 'Canceled',
  Done = 'Done',
  Ongoing = 'Ongoing',
  Upcoming = 'Upcoming'
}

export enum CalWeekdayGraph {
  Fr = 'FR',
  Mo = 'MO',
  Sa = 'SA',
  Su = 'SU',
  Th = 'TH',
  Tu = 'TU',
  We = 'WE'
}

export type ColorCodeGradientGraph = {
  __typename?: 'ColorCodeGradientGraph';
  finish?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['String']>;
};

export type ColorCodeGradientInput = {
  finish: Scalars['String'];
  start: Scalars['String'];
};

export type ColorCodeGradientInputType = {
  finish: Scalars['String'];
  start: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  _id: Scalars['String'];
  commentParentId: Scalars['String'];
  dateCreated: Scalars['DateTime'];
  dependentComments: Array<Comment>;
  doctor?: Maybe<Doctor>;
  doctorId: Scalars['String'];
  rating: Scalars['Int'];
  text?: Maybe<Scalars['String']>;
  user: User;
  userId: Scalars['String'];
};

export type Complain = {
  __typename?: 'Complain';
  complaint: Scalars['String'];
  doctor?: Maybe<Doctor>;
  doctorId: Scalars['String'];
  reason: Scalars['String'];
  sicknessTimeDuration: Scalars['String'];
};

export type CreateAppointmentResults = {
  description: Scalars['String'];
  photoURL?: InputMaybe<Scalars['Upload']>;
};

export type CreateComplaint = {
  complaint: Scalars['String'];
  reason?: InputMaybe<Scalars['String']>;
  sicknessTimeDuration: Scalars['String'];
};

export type CreateDiagnose = {
  deseaseDBCode?: InputMaybe<Scalars['String']>;
  diagnose: Scalars['String'];
  natureOfTheDesease: Scalars['String'];
  preliminary: Scalars['Boolean'];
};

export type CreateInspections = {
  data: Array<InspectionsDataInput>;
};

export type CreateRepeatingOptionsGraph = {
  byDay?: InputMaybe<Array<CalWeekdayGraph>>;
  byMonth?: InputMaybe<Array<Scalars['Int']>>;
  byMonthDay?: InputMaybe<Array<Scalars['Int']>>;
  bySetPos?: InputMaybe<Scalars['Int']>;
  count?: InputMaybe<Scalars['Int']>;
  exclude?: InputMaybe<Array<Scalars['DateTime']>>;
  freq: Scalars['String'];
  interval?: InputMaybe<Scalars['Int']>;
  startOfWeek?: InputMaybe<CalWeekdayGraph>;
  until?: InputMaybe<Scalars['DateTime']>;
};

export type CreateTreatmentPlanGraph = {
  medical?: InputMaybe<Array<CreateTreatmentPlanItemGraph>>;
  proccess?: InputMaybe<Array<CreateTreatmentPlanItemGraph>>;
  recomendation?: InputMaybe<Array<CreateTreatmentPlanItemGraph>>;
};

export type CreateTreatmentPlanItemGraph = {
  repeatingOptions: CreateRepeatingOptionsGraph;
  text: Scalars['String'];
};

export type Desease = {
  __typename?: 'Desease';
  _id: Scalars['String'];
  doctors?: Maybe<Array<Doctor>>;
  name: Scalars['String'];
};

export type Diagnose = {
  __typename?: 'Diagnose';
  deseaseDBCode?: Maybe<Scalars['String']>;
  diagnose: Scalars['String'];
  doctor?: Maybe<Doctor>;
  doctorId: Scalars['String'];
  natureOfTheDesease: Scalars['String'];
  preliminary: Scalars['Boolean'];
};

export type Doctor = {
  __typename?: 'Doctor';
  _id: Scalars['String'];
  acceptableAgeGroup?: Maybe<Scalars['String']>;
  avatar?: Maybe<PhotoUrl>;
  cabinet?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  deseases?: Maybe<Array<Desease>>;
  doctorPercentage: Scalars['Float'];
  email: Scalars['String'];
  experiences?: Maybe<Array<ExperienceAndEducation>>;
  fullName: Scalars['String'];
  isDeleted?: Maybe<Scalars['Boolean']>;
  isMan: Scalars['Boolean'];
  languages: Array<LanguageGraph>;
  numOfRatings: Scalars['Int'];
  phoneNumber: Scalars['String'];
  rating?: Maybe<Scalars['Float']>;
  specializations?: Maybe<Array<Specialization>>;
  startingExperienceDate: Scalars['DateTime'];
  upcomingBookings?: Maybe<Array<Booking>>;
  workTimes?: Maybe<Array<WorkTime>>;
};

export type DoctorSpecStatsGraph = {
  __typename?: 'DoctorSpecStatsGraph';
  doctor: Doctor;
  specialization?: Maybe<Specialization>;
  totalMoneyEarnt: Scalars['Int'];
  totalNumOfSessions: Scalars['Int'];
};

export type DoctorTokenGraph = {
  __typename?: 'DoctorTokenGraph';
  doctor: Doctor;
  token: Scalars['String'];
};

export type EditAppointmentResultsInput = {
  description?: InputMaybe<Scalars['String']>;
  doctorId?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<Scalars['Upload']>;
};

export type EditComplaintInput = {
  complaint?: InputMaybe<Scalars['String']>;
  doctorId?: InputMaybe<Scalars['String']>;
  reason?: InputMaybe<Scalars['String']>;
  sicknessTimeDuration?: InputMaybe<Scalars['String']>;
};

export type EditDiagnoseInput = {
  deseaseDBCode?: InputMaybe<Scalars['String']>;
  diagnose?: InputMaybe<Scalars['String']>;
  doctorId?: InputMaybe<Scalars['String']>;
  natureOfTheDesease?: InputMaybe<Scalars['String']>;
  preliminary?: InputMaybe<Scalars['Boolean']>;
};

export type EditInspections = {
  data: Array<EditInspectionsDataInput>;
  doctorId?: InputMaybe<Scalars['String']>;
};

export type EditInspectionsDataInput = {
  description?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<Array<Scalars['Upload']>>;
  photoURL: Array<PhotoUrlInput>;
};

export type ExperienceAndEducation = {
  __typename?: 'ExperienceAndEducation';
  _id: Scalars['String'];
  data?: Maybe<Array<ExperienceAndEducationData>>;
  name: AllowedExperienceAndEducationTypes;
};

export type ExperienceAndEducationData = {
  __typename?: 'ExperienceAndEducationData';
  institutionName: Scalars['String'];
  specialty: Scalars['String'];
  years: Array<Scalars['Int']>;
};

export type ExperienceDataInput = {
  institutionName: Scalars['String'];
  specialty: Scalars['String'];
  years: Array<Scalars['Int']>;
};

export type ExperienceInput = {
  data: Array<ExperienceDataInput>;
  name: AllowedExperienceAndEducationTypes;
};

export type Forwards = {
  __typename?: 'Forwards';
  _id: Scalars['String'];
  dateAdded: Scalars['DateTime'];
  doctor: Doctor;
  services: Array<Service>;
  user: User;
};

export type Icd = {
  __typename?: 'ICD';
  code: Scalars['String'];
  description: Scalars['String'];
};

export type Inspections = {
  __typename?: 'Inspections';
  _id: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  doctor?: Maybe<Doctor>;
  doctorId: Scalars['String'];
  images?: Maybe<Array<PhotoUrl>>;
};

export type InspectionsDataInput = {
  description?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<Array<Scalars['Upload']>>;
};

export type LanguageGraph = {
  __typename?: 'LanguageGraph';
  language: AllowedDoctorLanguages;
  type: AllowedDoctorLanguageTypes;
};

export type LanguageInput = {
  language: AllowedDoctorLanguages;
  type: AllowedDoctorLanguageTypes;
};

export type Mutation = {
  __typename?: 'Mutation';
  ICDScript: Scalars['String'];
  addAllToSearch: Scalars['String'];
  addDoctorToAppointmentBlank: AppointmentBlankGraph;
  attachDoctorToDesease: Desease;
  attachDoctorToSpecialization: Specialization;
  attachServiceToDoctor: Service;
  attachUnshownServiceToShownService: Service;
  cancelBooking: Booking;
  changeStatusToPayedSessions: Scalars['Boolean'];
  checkSMSVerificationCode: User;
  createBooking: Booking;
  createDesease: Desease;
  createForward: Forwards;
  createService: Service;
  createSessionBlank: AppointmentBlankGraph;
  createSpecialization: Specialization;
  deleteDoctor: Doctor;
  deleteService: Scalars['Boolean'];
  deleteServices: Scalars['Boolean'];
  doctorScript: Scalars['String'];
  editAdmin: Admin;
  editDoctor: Doctor;
  editDoctorWithFile: Doctor;
  editService: Service;
  editSessionBlank: AppointmentBlankGraph;
  editSpecializationWithFile: Specialization;
  editSpecializationWithoutFile: Specialization;
  editUser: User;
  endSession: Session;
  funckingPlanOfTakingShit: Scalars['String'];
  leaveComment: Comment;
  registerAdmin: Admin;
  registerDoctor: DoctorTokenGraph;
  registerSecretary: TokenSecretary;
  registerUser: User;
  sendVerSMS: Scalars['String'];
  serviceScript: Scalars['String'];
  specScript: Scalars['String'];
  startSession: Session;
};


export type MutationAddDoctorToAppointmentBlankArgs = {
  appointmentBlankId: Scalars['String'];
  doctorId: Scalars['String'];
};


export type MutationAttachDoctorToDeseaseArgs = {
  deseaseId: Scalars['String'];
  doctorId: Scalars['String'];
};


export type MutationAttachDoctorToSpecializationArgs = {
  doctorId: Scalars['String'];
  specializationId: Scalars['String'];
};


export type MutationAttachServiceToDoctorArgs = {
  doctorId: Scalars['String'];
  serviceId: Scalars['String'];
};


export type MutationAttachUnshownServiceToShownServiceArgs = {
  shownServiceId: Scalars['String'];
  unShownServiceId: Scalars['String'];
};


export type MutationCancelBookingArgs = {
  bookingId: Scalars['String'];
};


export type MutationChangeStatusToPayedSessionsArgs = {
  sessionIds: Array<Scalars['String']>;
};


export type MutationCheckSmsVerificationCodeArgs = {
  code: Scalars['String'];
  phoneNumber: Scalars['String'];
};


export type MutationCreateBookingArgs = {
  doctorId: Scalars['String'];
  endDate?: InputMaybe<Scalars['DateTime']>;
  serviceId?: InputMaybe<Scalars['String']>;
  startDate: Scalars['DateTime'];
  userId?: InputMaybe<Scalars['String']>;
};


export type MutationCreateDeseaseArgs = {
  name: Scalars['String'];
};


export type MutationCreateForwardArgs = {
  serviceIds: Array<Scalars['String']>;
  userId: Scalars['String'];
};


export type MutationCreateServiceArgs = {
  description: Scalars['String'];
  doctorIds?: InputMaybe<Array<Scalars['String']>>;
  durationInMinutes?: InputMaybe<Scalars['Int']>;
  isShown?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  price: Scalars['Int'];
  specializationIds?: InputMaybe<Array<Scalars['String']>>;
};


export type MutationCreateSessionBlankArgs = {
  appointmentResults?: InputMaybe<CreateAppointmentResults>;
  complaint?: InputMaybe<CreateComplaint>;
  diagnose?: InputMaybe<CreateDiagnose>;
  inspections?: InputMaybe<CreateInspections>;
  sessionId: Scalars['String'];
  treatmentPlan?: InputMaybe<CreateTreatmentPlanGraph>;
};


export type MutationCreateSpecializationArgs = {
  colorCodeGradient?: InputMaybe<ColorCodeGradientInput>;
  description: Scalars['String'];
  image?: InputMaybe<Scalars['Upload']>;
  name: Scalars['String'];
};


export type MutationDeleteDoctorArgs = {
  doctorId?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteServiceArgs = {
  serviceId: Scalars['String'];
};


export type MutationDeleteServicesArgs = {
  serviceIds: Array<Scalars['String']>;
};


export type MutationEditAdminArgs = {
  email?: InputMaybe<Scalars['String']>;
  fullName?: InputMaybe<Scalars['String']>;
  newPassword?: InputMaybe<Scalars['String']>;
  oldPassword?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};


export type MutationEditDoctorArgs = {
  acceptableAgeGroup?: InputMaybe<AcceptableAgeGroup>;
  avatar?: InputMaybe<Scalars['Upload']>;
  cabinet?: InputMaybe<Scalars['String']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  doctorId?: InputMaybe<Scalars['String']>;
  doctorPercentage?: InputMaybe<Scalars['Float']>;
  email?: InputMaybe<Scalars['String']>;
  experiences?: InputMaybe<Array<ExperienceInput>>;
  fullName?: InputMaybe<Scalars['String']>;
  isMan?: InputMaybe<Scalars['Boolean']>;
  languages?: InputMaybe<Array<LanguageInput>>;
  password?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  specializationIds?: InputMaybe<Array<Scalars['String']>>;
  startingExperienceDate?: InputMaybe<Scalars['DateTime']>;
  workTimes?: InputMaybe<Array<WorkTimeInput>>;
};


export type MutationEditDoctorWithFileArgs = {
  doctorId: Scalars['String'];
  image: Scalars['Upload'];
};


export type MutationEditServiceArgs = {
  description?: InputMaybe<Scalars['String']>;
  doctorIds?: InputMaybe<Array<Scalars['String']>>;
  durationInMinutes?: InputMaybe<Scalars['Int']>;
  isShown?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
  serviceId: Scalars['String'];
  specializationId?: InputMaybe<Array<Scalars['String']>>;
};


export type MutationEditSessionBlankArgs = {
  appointmentBlankId: Scalars['String'];
  appointmentResults?: InputMaybe<EditAppointmentResultsInput>;
  complaints?: InputMaybe<EditComplaintInput>;
  diagnose?: InputMaybe<EditDiagnoseInput>;
  inspections?: InputMaybe<EditInspections>;
};


export type MutationEditSpecializationWithFileArgs = {
  image: Scalars['Upload'];
  specializationId: Scalars['String'];
};


export type MutationEditSpecializationWithoutFileArgs = {
  colorCode?: InputMaybe<Scalars['String']>;
  colorCodeGradient?: InputMaybe<ColorCodeGradientInputType>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  specializationId: Scalars['String'];
};


export type MutationEditUserArgs = {
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  fullName?: InputMaybe<Scalars['String']>;
  peculiarities?: InputMaybe<PeculiaritiesInput>;
  userId?: InputMaybe<Scalars['String']>;
};


export type MutationEndSessionArgs = {
  sessionId: Scalars['String'];
};


export type MutationFunckingPlanOfTakingShitArgs = {
  daysToRepeat: Array<Scalars['String']>;
  description: Scalars['String'];
  freq: Scalars['String'];
  to: Scalars['String'];
};


export type MutationLeaveCommentArgs = {
  commentParentId?: InputMaybe<Scalars['String']>;
  doctorId: Scalars['String'];
  rating: Scalars['Int'];
  text?: InputMaybe<Scalars['String']>;
};


export type MutationRegisterAdminArgs = {
  email: Scalars['String'];
  fullName: Scalars['String'];
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
};


export type MutationRegisterDoctorArgs = {
  acceptableAgeGroup: AcceptableAgeGroup;
  avatar?: InputMaybe<Scalars['Upload']>;
  cabinet: Scalars['String'];
  dateOfBirth: Scalars['DateTime'];
  description: Scalars['String'];
  doctorPercentage?: InputMaybe<Scalars['Float']>;
  email: Scalars['String'];
  experience?: InputMaybe<Array<ExperienceInput>>;
  fullName: Scalars['String'];
  isMan?: InputMaybe<Scalars['Boolean']>;
  languages: Array<LanguageInput>;
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
  specializationIds?: InputMaybe<Array<Scalars['String']>>;
  startingExperienceDate: Scalars['DateTime'];
  workTimes?: InputMaybe<Array<WorkTimeInput>>;
};


export type MutationRegisterSecretaryArgs = {
  email: Scalars['String'];
  fullName: Scalars['String'];
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
};


export type MutationRegisterUserArgs = {
  dateOfBirth: Scalars['String'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  peculiarities?: InputMaybe<PeculiaritiesInput>;
  phoneNumber: Scalars['String'];
};


export type MutationSendVerSmsArgs = {
  phoneNumber: Scalars['String'];
};


export type MutationStartSessionArgs = {
  appointmentBlankId?: InputMaybe<Scalars['String']>;
  bookingId?: InputMaybe<Scalars['String']>;
};

export type Notification = {
  __typename?: 'Notification';
  _id: Scalars['String'];
  bookingId?: Maybe<Scalars['String']>;
  commentId?: Maybe<Scalars['String']>;
  data: NotificationDataUnion;
  dateCreated: Scalars['DateTime'];
  type: NotificationTypes;
};

export type NotificationDataUnion = Booking | Comment;

export enum NotificationTypes {
  CancelledBookingByAdmin = 'CancelledBookingByAdmin',
  CancelledBookingByDoctor = 'CancelledBookingByDoctor',
  CancelledBookingByUser = 'CancelledBookingByUser',
  NewBooking = 'NewBooking',
  NewComment = 'NewComment'
}

export type Peculiarities = {
  __typename?: 'Peculiarities';
  RHFactor?: Maybe<AllowedRhFactorTypes>;
  allergies?: Maybe<Array<Scalars['String']>>;
  bloodType?: Maybe<Scalars['String']>;
};

export type PeculiaritiesInput = {
  RHFactor?: InputMaybe<AllowedRhFactorTypes>;
  allergies?: InputMaybe<Array<Scalars['String']>>;
  bloodType?: InputMaybe<Scalars['String']>;
};

export type PhotoUrl = {
  __typename?: 'PhotoURL';
  m?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
  xl?: Maybe<Scalars['String']>;
};

export type PhotoUrlInput = {
  m?: InputMaybe<Scalars['String']>;
  thumbnail?: InputMaybe<Scalars['String']>;
  xl?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  attachAllDoctorsToServicesScript: Scalars['String'];
  findSpecialization: Specialization;
  getActiveSessionByUserId?: Maybe<Session>;
  getAllDoctors: Array<Doctor>;
  getAppointmentBlanksOfUser: Array<AppointmentBlankGraph>;
  getBookingsByDate: Array<Booking>;
  getBookingsByDoctorIdAndDates: Array<Booking>;
  getBookingsByProgressStatus: Array<Booking>;
  getBookingsOfUser: Array<Booking>;
  getCommentsOfDoctor: Array<Comment>;
  getDesease: Array<Desease>;
  getDoctorByID: Doctor;
  getDoctorsBySpecializationId: Array<Doctor>;
  getDoctorsSessionsOfUser: Array<Session>;
  getGeneralStats: StatsGraph;
  getHistoryOfSessions: Array<Session>;
  getHistoryOfSessionsOfDoctor: Array<Session>;
  getHistoryOfSessionsOfDoctorByPeriodsOfTime: Array<Session>;
  getNotifications: Array<Notification>;
  getNumOfUnseenNotifications: Scalars['Int'];
  getPrimaryServiceOfDoctor?: Maybe<Service>;
  getServiceById: Service;
  getServicesByDoctorId: Array<Service>;
  getServicesByDoctorIds: Array<Service>;
  getServicesBySpecializationId: Array<Service>;
  getSessionByPeriodOfTime: Array<Session>;
  getSessionPeriodTime: Array<Session>;
  getSessionsOfUser: Array<Session>;
  getShit: Array<Doctor>;
  getShownForMainByDoctorIdServices: Array<Service>;
  getSpecStats: StatsGraph;
  getSpecializationById: Specialization;
  getSpecializationStatsByPeriodOfTime: Array<SpecializationStatsGraph>;
  getSpecializations: Array<Specialization>;
  getStatsOfDoctorByPeriodsOfTime: DoctorSpecStatsGraph;
  getStatsOfDoctorsByPeriodOfTimeAndSpecialization: Array<DoctorSpecStatsGraph>;
  getUnpayedSessions: Array<Session>;
  getUnshownServicesForPatient: Array<Service>;
  getUpcomingBookings: Array<Booking>;
  getUpcomingBookingsOfDoctor: Array<Booking>;
  getUpcomingBookingsOfUser: Array<Booking>;
  getUserByID: User;
  getUsersForwards: Array<Forwards>;
  listUsers: Array<User>;
  loginAdmin: Admin;
  loginAsSecretary: TokenSecretary;
  loginDoctor: DoctorTokenGraph;
  search: SearchGraph;
  searchICD: Array<Icd>;
};


export type QueryFindSpecializationArgs = {
  specializationId: Scalars['String'];
};


export type QueryGetActiveSessionByUserIdArgs = {
  userId: Scalars['String'];
};


export type QueryGetAppointmentBlanksOfUserArgs = {
  page?: InputMaybe<Scalars['Int']>;
  userId: Scalars['String'];
};


export type QueryGetBookingsByDateArgs = {
  firstDate: Scalars['DateTime'];
  page: Scalars['Int'];
  secondDate: Scalars['DateTime'];
};


export type QueryGetBookingsByDoctorIdAndDatesArgs = {
  doctorId?: InputMaybe<Scalars['String']>;
  firstDate: Scalars['DateTime'];
  secondDate: Scalars['DateTime'];
};


export type QueryGetBookingsByProgressStatusArgs = {
  doctorId?: InputMaybe<Scalars['String']>;
  page: Scalars['Int'];
  progressStatus: BookingProgress;
};


export type QueryGetBookingsOfUserArgs = {
  page: Scalars['Int'];
  userId: Scalars['String'];
};


export type QueryGetCommentsOfDoctorArgs = {
  doctorId: Scalars['String'];
  page: Scalars['Int'];
};


export type QueryGetDeseaseArgs = {
  page: Scalars['Int'];
};


export type QueryGetDoctorByIdArgs = {
  doctorId: Scalars['String'];
};


export type QueryGetDoctorsBySpecializationIdArgs = {
  specializationId: Scalars['String'];
};


export type QueryGetDoctorsSessionsOfUserArgs = {
  doctorId?: InputMaybe<Scalars['String']>;
  page: Scalars['Int'];
  userId: Scalars['String'];
};


export type QueryGetGeneralStatsArgs = {
  firstDate: Scalars['DateTime'];
  period: AllowedPeriodsOfTime;
  secondDate: Scalars['DateTime'];
};


export type QueryGetHistoryOfSessionsArgs = {
  page: Scalars['Int'];
};


export type QueryGetHistoryOfSessionsOfDoctorArgs = {
  doctorId?: InputMaybe<Scalars['String']>;
  page: Scalars['Int'];
};


export type QueryGetHistoryOfSessionsOfDoctorByPeriodsOfTimeArgs = {
  doctorId?: InputMaybe<Scalars['String']>;
  firstDate: Scalars['DateTime'];
  secondDate: Scalars['DateTime'];
};


export type QueryGetNotificationsArgs = {
  page: Scalars['Int'];
  type?: InputMaybe<NotificationTypes>;
};


export type QueryGetPrimaryServiceOfDoctorArgs = {
  doctorId: Scalars['String'];
};


export type QueryGetServiceByIdArgs = {
  serviceId: Scalars['String'];
};


export type QueryGetServicesByDoctorIdArgs = {
  doctorId: Scalars['String'];
};


export type QueryGetServicesByDoctorIdsArgs = {
  doctorId: Array<Scalars['String']>;
  page: Scalars['Int'];
};


export type QueryGetServicesBySpecializationIdArgs = {
  page: Scalars['Int'];
  specializationId: Scalars['String'];
};


export type QueryGetSessionByPeriodOfTimeArgs = {
  firstDate: Scalars['DateTime'];
  secondDate: Scalars['DateTime'];
};


export type QueryGetSessionPeriodTimeArgs = {
  endTime: Scalars['DateTime'];
  startTime: Scalars['DateTime'];
};


export type QueryGetSessionsOfUserArgs = {
  page: Scalars['Int'];
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryGetShownForMainByDoctorIdServicesArgs = {
  doctorId: Scalars['String'];
};


export type QueryGetSpecStatsArgs = {
  firstDate: Scalars['DateTime'];
  period: AllowedPeriodsOfTime;
  secondDate: Scalars['DateTime'];
  specializationId: Scalars['String'];
};


export type QueryGetSpecializationByIdArgs = {
  specializationId: Scalars['String'];
};


export type QueryGetSpecializationStatsByPeriodOfTimeArgs = {
  firstDate: Scalars['DateTime'];
  secondDate: Scalars['DateTime'];
};


export type QueryGetStatsOfDoctorByPeriodsOfTimeArgs = {
  doctorId?: InputMaybe<Scalars['String']>;
  firstDate: Scalars['DateTime'];
  secondDate: Scalars['DateTime'];
};


export type QueryGetStatsOfDoctorsByPeriodOfTimeAndSpecializationArgs = {
  firstDate: Scalars['DateTime'];
  secondDate: Scalars['DateTime'];
  specializationId: Scalars['String'];
};


export type QueryGetUnpayedSessionsArgs = {
  page: Scalars['Int'];
};


export type QueryGetUpcomingBookingsArgs = {
  page: Scalars['Int'];
};


export type QueryGetUpcomingBookingsOfDoctorArgs = {
  doctorId?: InputMaybe<Scalars['String']>;
};


export type QueryGetUpcomingBookingsOfUserArgs = {
  userId: Scalars['String'];
};


export type QueryGetUserByIdArgs = {
  userId: Scalars['String'];
};


export type QueryGetUsersForwardsArgs = {
  page: Scalars['Int'];
  userId: Scalars['String'];
};


export type QueryLoginAdminArgs = {
  email?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
};


export type QueryLoginAsSecretaryArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type QueryLoginDoctorArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type QuerySearchArgs = {
  searchQuery: Scalars['String'];
};


export type QuerySearchIcdArgs = {
  query: Scalars['String'];
};

export type RepeatingOptionsGraph = {
  __typename?: 'RepeatingOptionsGraph';
  byDay?: Maybe<Array<CalWeekdayGraph>>;
  byMonth?: Maybe<Array<Scalars['Int']>>;
  byMonthDay?: Maybe<Array<Scalars['Int']>>;
  bySetPos?: Maybe<Scalars['Int']>;
  count?: Maybe<Scalars['Int']>;
  exclude?: Maybe<Array<Scalars['DateTime']>>;
  freq: Scalars['String'];
  interval?: Maybe<Scalars['Int']>;
  startOfWeek?: Maybe<CalWeekdayGraph>;
  until?: Maybe<Scalars['DateTime']>;
};

export type SearchGraph = {
  __typename?: 'SearchGraph';
  deseases?: Maybe<Array<Desease>>;
  doctors?: Maybe<Array<Doctor>>;
  services?: Maybe<Array<Service>>;
  specializations?: Maybe<Array<Specialization>>;
};

export type Secretary = {
  __typename?: 'Secretary';
  _id: Scalars['String'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type Service = {
  __typename?: 'Service';
  _id: Scalars['String'];
  description: Scalars['String'];
  doctors?: Maybe<Array<Doctor>>;
  durationInMinutes?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type Session = {
  __typename?: 'Session';
  _id: Scalars['String'];
  booking?: Maybe<Booking>;
  clinicPercnetage: Scalars['Float'];
  count: Scalars['Int'];
  doctor?: Maybe<Doctor>;
  doctorId: Scalars['String'];
  endDate: Scalars['String'];
  price: Scalars['Float'];
  service?: Maybe<Service>;
  serviceId: Scalars['String'];
  specializationIds?: Maybe<Array<Scalars['String']>>;
  specializations?: Maybe<Array<Specialization>>;
  startDate: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type Specialization = {
  __typename?: 'Specialization';
  _id: Scalars['String'];
  colorCodeGradient?: Maybe<ColorCodeGradientGraph>;
  description: Scalars['String'];
  doctors: Array<Doctor>;
  name: Scalars['String'];
  photoURL?: Maybe<PhotoUrl>;
  services: Array<Service>;
};

export type SpecializationStatsGraph = {
  __typename?: 'SpecializationStatsGraph';
  individualSpecialistNum: Scalars['Int'];
  specialization: Specialization;
  totalMoneyEarnt: Scalars['Int'];
  totalNumSessions: Scalars['Int'];
};

export type StatsGraph = {
  __typename?: 'StatsGraph';
  data: Array<StatsGraphicDatesGraph>;
  endDate: Scalars['DateTime'];
  startDate: Scalars['DateTime'];
  totalIndividualPatients: Scalars['Int'];
  totalMoneyEarnt: Scalars['Int'];
  totalSessionSum: Scalars['Int'];
};

export type StatsGraphicDatesGraph = {
  __typename?: 'StatsGraphicDatesGraph';
  day?: Maybe<Scalars['Int']>;
  month: Scalars['Int'];
  sum: Scalars['Int'];
  type: AllowedGraphTypes;
  year?: Maybe<Scalars['Int']>;
};

export type TokenSecretary = {
  __typename?: 'TokenSecretary';
  secretary: Secretary;
  token: Scalars['String'];
};

export type TreatmentPlanGraph = {
  __typename?: 'TreatmentPlanGraph';
  medical: Array<TreatmentPlanItemGraph>;
  proccess: Array<TreatmentPlanItemGraph>;
  recomendation: Array<TreatmentPlanItemGraph>;
};

export type TreatmentPlanItemGraph = {
  __typename?: 'TreatmentPlanItemGraph';
  repeatingOptions: RepeatingOptionsGraph;
  text: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  dateOfBirth: Scalars['DateTime'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  peculiarities?: Maybe<Peculiarities>;
  phoneNumber: Scalars['String'];
  photoURL?: Maybe<PhotoUrl>;
  token?: Maybe<Scalars['String']>;
};

export type WorkTime = {
  __typename?: 'WorkTime';
  endTime: Scalars['DateTime'];
  startTime: Scalars['DateTime'];
};

export type WorkTimeInput = {
  endTime: Scalars['DateTime'];
  startTime: Scalars['DateTime'];
};

export type CancelBookingMutationVariables = Exact<{
  bookingId: Scalars['String'];
}>;


export type CancelBookingMutation = { __typename?: 'Mutation', cancelBooking: { __typename?: 'Booking', _id: string, service?: { __typename?: 'Service', name: string } | null } };

export type CheckSmsVerificationCodeMutationVariables = Exact<{
  code: Scalars['String'];
  phoneNumber: Scalars['String'];
}>;


export type CheckSmsVerificationCodeMutation = { __typename?: 'Mutation', checkSMSVerificationCode: { __typename?: 'User', _id: string, token?: string | null, phoneNumber: string } };

export type CreateBookingMutationVariables = Exact<{
  doctorId: Scalars['String'];
  endDate?: InputMaybe<Scalars['DateTime']>;
  serviceId?: InputMaybe<Scalars['String']>;
  startDate: Scalars['DateTime'];
  userId?: InputMaybe<Scalars['String']>;
}>;


export type CreateBookingMutation = { __typename?: 'Mutation', createBooking: { __typename?: 'Booking', _id: string, startDate: any } };

export type AddDoctorToAppointmentBlankMutationVariables = Exact<{
  appointmentBlankId: Scalars['String'];
  doctorId: Scalars['String'];
}>;


export type AddDoctorToAppointmentBlankMutation = { __typename?: 'Mutation', addDoctorToAppointmentBlank: { __typename?: 'AppointmentBlankGraph', _id: string } };

export type CreateForwardMutationVariables = Exact<{
  serviceId: Array<Scalars['String']> | Scalars['String'];
  userId: Scalars['String'];
}>;


export type CreateForwardMutation = { __typename?: 'Mutation', createForward: { __typename?: 'Forwards', _id: string } };

export type CreateServiceMutationVariables = Exact<{
  description: Scalars['String'];
  doctorIds?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  durationInMinutes?: InputMaybe<Scalars['Int']>;
  isShown?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  price: Scalars['Int'];
  specializationId: Scalars['String'];
}>;


export type CreateServiceMutation = { __typename?: 'Mutation', createService: { __typename?: 'Service', _id: string, name: string } };

export type EditSessionBlankMutationVariables = Exact<{
  complaint: EditComplaintInput;
  diagnose: EditDiagnoseInput;
  inspections: EditInspections;
  appointmentResults?: InputMaybe<EditAppointmentResultsInput>;
  appointmentBlankId: Scalars['String'];
}>;


export type EditSessionBlankMutation = { __typename?: 'Mutation', editSessionBlank: { __typename: 'AppointmentBlankGraph' } };

export type EditDoctorMutationVariables = Exact<{
  doctorId: Scalars['String'];
  fullName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  acceptableAgeGroup?: InputMaybe<AcceptableAgeGroup>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['Upload']>;
  experiences?: InputMaybe<Array<ExperienceInput> | ExperienceInput>;
  languages?: InputMaybe<Array<LanguageInput> | LanguageInput>;
  password?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  startingExperienceDate?: InputMaybe<Scalars['DateTime']>;
  workTimes?: InputMaybe<Array<WorkTimeInput> | WorkTimeInput>;
  cabinet?: InputMaybe<Scalars['String']>;
}>;


export type EditDoctorMutation = { __typename?: 'Mutation', editDoctor: { __typename?: 'Doctor', _id: string } };

export type EditDoctorAvatarMutationVariables = Exact<{
  doctorId: Scalars['String'];
  image: Scalars['Upload'];
}>;


export type EditDoctorAvatarMutation = { __typename?: 'Mutation', editDoctorWithFile: { __typename?: 'Doctor', _id: string, avatar?: { __typename?: 'PhotoURL', m?: string | null } | null } };

export type RegisterDoctorMutationVariables = Exact<{
  fullName: Scalars['String'];
  email: Scalars['String'];
  description: Scalars['String'];
  acceptableAgeGroup: AcceptableAgeGroup;
  dateOfBirth: Scalars['DateTime'];
  avatar?: InputMaybe<Scalars['Upload']>;
  experience?: InputMaybe<Array<ExperienceInput> | ExperienceInput>;
  languages: Array<LanguageInput> | LanguageInput;
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
  startingExperienceDate: Scalars['DateTime'];
  workTimes?: InputMaybe<Array<WorkTimeInput> | WorkTimeInput>;
  cabinet: Scalars['String'];
  specializationIds?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type RegisterDoctorMutation = { __typename?: 'Mutation', registerDoctor: { __typename?: 'DoctorTokenGraph', doctor: { __typename?: 'Doctor', _id: string, description?: string | null } } };

export type RegisterUserMutationVariables = Exact<{
  dateOfBirth: Scalars['String'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  phoneNumber: Scalars['String'];
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'User', _id: string, token?: string | null } };

export type SendVerSmsMutationVariables = Exact<{
  phoneNumber: Scalars['String'];
}>;


export type SendVerSmsMutation = { __typename?: 'Mutation', sendVerSMS: string };

export type StartSesisonMutationVariables = Exact<{
  bookingId: Scalars['String'];
}>;


export type StartSesisonMutation = { __typename?: 'Mutation', startSession: { __typename?: 'Session', _id: string } };

export type EndSessionMutationVariables = Exact<{
  sessionId: Scalars['String'];
}>;


export type EndSessionMutation = { __typename?: 'Mutation', endSession: { __typename?: 'Session', _id: string } };

export type UploadSessionBlankMutationVariables = Exact<{
  complaint: CreateComplaint;
  diagnose: CreateDiagnose;
  inspections: CreateInspections;
  sessionId: Scalars['String'];
  appointmentResults?: InputMaybe<CreateAppointmentResults>;
  treatmentPlan?: InputMaybe<CreateTreatmentPlanGraph>;
}>;


export type UploadSessionBlankMutation = { __typename?: 'Mutation', createSessionBlank: { __typename: 'AppointmentBlankGraph' } };

export type GetUpcomingBookingsOfDoctorQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUpcomingBookingsOfDoctorQuery = { __typename?: 'Query', getUpcomingBookingsOfDoctor: Array<{ __typename?: 'Booking', _id: string, startDate: any, progress: BookingProgress, endDate: any, doctor?: { __typename?: 'Doctor', _id: string, fullName: string } | null, user: { __typename?: 'User', fullName: string, phoneNumber: string, _id: string }, service?: { __typename?: 'Service', name: string } | null }> };

export type GetBookingsOfDoctorQueryVariables = Exact<{
  doctorId: Scalars['String'];
  firstDate: Scalars['DateTime'];
  secondDate: Scalars['DateTime'];
}>;


export type GetBookingsOfDoctorQuery = { __typename?: 'Query', getBookingsByDoctorIdAndDates: Array<{ __typename?: 'Booking', _id: string, startDate: any, progress: BookingProgress, endDate: any, doctor?: { __typename?: 'Doctor', _id: string, fullName: string } | null, user: { __typename?: 'User', fullName: string, phoneNumber: string, _id: string }, service?: { __typename?: 'Service', name: string, price: number } | null }> };

export type GetStatsOfDoctorByPeriodsOfTimeQueryVariables = Exact<{
  startDate: Scalars['DateTime'];
  secondDate: Scalars['DateTime'];
}>;


export type GetStatsOfDoctorByPeriodsOfTimeQuery = { __typename?: 'Query', getStatsOfDoctorByPeriodsOfTime: { __typename?: 'DoctorSpecStatsGraph', totalMoneyEarnt: number, totalNumOfSessions: number } };

export type GetUserByIdQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserByID: { __typename?: 'User', fullName: string, phoneNumber: string, dateOfBirth: any, email: string } };

export type GetActiveSessionByUserIdQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetActiveSessionByUserIdQuery = { __typename?: 'Query', getActiveSessionByUserId?: { __typename?: 'Session', _id: string, count: number, startDate: string, booking?: { __typename?: 'Booking', service?: { __typename?: 'Service', name: string } | null, doctor?: { __typename?: 'Doctor', _id: string } | null } | null } | null };

export type GetAllDoctorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllDoctorsQuery = { __typename?: 'Query', getAllDoctors: Array<{ __typename?: 'Doctor', _id: string, fullName: string, acceptableAgeGroup?: string | null, description?: string | null, email: string, numOfRatings: number, phoneNumber: string, rating?: number | null, upcomingBookings?: Array<{ __typename?: 'Booking', _id: string, startDate: any, endDate: any }> | null, avatar?: { __typename?: 'PhotoURL', xl?: string | null } | null, specializations?: Array<{ __typename?: 'Specialization', name: string }> | null, workTimes?: Array<{ __typename?: 'WorkTime', endTime: any, startTime: any }> | null }> };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', listUsers: Array<{ __typename?: 'User', fullName: string, _id: string, phoneNumber: string, photoURL?: { __typename?: 'PhotoURL', m?: string | null } | null }> };

export type GetAppointmentBlanksOfUserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetAppointmentBlanksOfUserQuery = { __typename?: 'Query', getAppointmentBlanksOfUser: Array<{ __typename?: 'AppointmentBlankGraph', _id: string, createdAt: any, complaint?: { __typename?: 'Complain', complaint: string, sicknessTimeDuration: string, reason: string, doctorId: string, doctor?: { __typename?: 'Doctor', fullName: string, avatar?: { __typename?: 'PhotoURL', m?: string | null } | null } | null } | null, owners: Array<{ __typename?: 'AppointmentBlankOwnersGraph', doctor?: { __typename?: 'Doctor', _id: string, fullName: string } | null }>, diagnose?: { __typename?: 'Diagnose', diagnose: string, deseaseDBCode?: string | null, natureOfTheDesease: string, preliminary: boolean, doctorId: string, doctor?: { __typename?: 'Doctor', fullName: string, avatar?: { __typename?: 'PhotoURL', m?: string | null } | null } | null } | null, inspections?: Array<{ __typename?: 'Inspections', description?: string | null, doctorId: string, _id: string, doctor?: { __typename?: 'Doctor', fullName: string, avatar?: { __typename?: 'PhotoURL', m?: string | null } | null } | null, images?: Array<{ __typename?: 'PhotoURL', m?: string | null }> | null }> | null }> };

export type GetDoctorByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetDoctorByIdQuery = { __typename?: 'Query', getDoctorByID: { __typename?: 'Doctor', _id: string, acceptableAgeGroup?: string | null, cabinet?: string | null, description?: string | null, email: string, fullName: string, doctorPercentage: number, numOfRatings: number, phoneNumber: string, rating?: number | null, avatar?: { __typename?: 'PhotoURL', m?: string | null } | null, deseases?: Array<{ __typename?: 'Desease', _id: string }> | null, experiences?: Array<{ __typename?: 'ExperienceAndEducation', name: AllowedExperienceAndEducationTypes, data?: Array<{ __typename?: 'ExperienceAndEducationData', institutionName: string, years: Array<number>, specialty: string }> | null }> | null, languages: Array<{ __typename?: 'LanguageGraph', language: AllowedDoctorLanguages, type: AllowedDoctorLanguageTypes }>, specializations?: Array<{ __typename?: 'Specialization', _id: string, name: string }> | null, workTimes?: Array<{ __typename?: 'WorkTime', endTime: any, startTime: any }> | null } };

export type GetDoctorSearchQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDoctorSearchQuery = { __typename?: 'Query', getAllDoctors: Array<{ __typename?: 'Doctor', _id: string, fullName: string, acceptableAgeGroup?: string | null, description?: string | null, email: string, numOfRatings: number, phoneNumber: string, rating?: number | null, upcomingBookings?: Array<{ __typename?: 'Booking', _id: string, startDate: any, endDate: any }> | null, avatar?: { __typename?: 'PhotoURL', xl?: string | null } | null, specializations?: Array<{ __typename?: 'Specialization', name: string }> | null, workTimes?: Array<{ __typename?: 'WorkTime', endTime: any, startTime: any }> | null }> };

export type GetAllDoctorsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllDoctorsQueryQuery = { __typename?: 'Query', getAllDoctors: Array<{ __typename?: 'Doctor', _id: string, acceptableAgeGroup?: string | null, description?: string | null, email: string, fullName: string, numOfRatings: number, phoneNumber: string, rating?: number | null, avatar?: { __typename?: 'PhotoURL', m?: string | null } | null, specializations?: Array<{ __typename?: 'Specialization', name: string, _id: string }> | null }> };

export type GetAllDoctorsSearchQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllDoctorsSearchQuery = { __typename?: 'Query', getAllDoctors: Array<{ __typename?: 'Doctor', _id: string, fullName: string, specializations?: Array<{ __typename?: 'Specialization', _id: string, name: string }> | null }> };

export type GetServiceByDoctorIdQueryVariables = Exact<{
  doctorId: Scalars['String'];
}>;


export type GetServiceByDoctorIdQuery = { __typename?: 'Query', getServicesByDoctorId: Array<{ __typename?: 'Service', _id: string, name: string }> };

export type GetServicesByIdQueryVariables = Exact<{
  serviceId: Scalars['String'];
}>;


export type GetServicesByIdQuery = { __typename?: 'Query', getServiceById: { __typename?: 'Service', price: number, name: string } };

export type GetServicesByDoctorIdsQueryVariables = Exact<{
  doctorId: Array<Scalars['String']> | Scalars['String'];
  page: Scalars['Int'];
}>;


export type GetServicesByDoctorIdsQuery = { __typename?: 'Query', getServicesByDoctorIds: Array<{ __typename?: 'Service', _id: string, description: string, name: string, price: number }> };

export type GetServicesBySpecializationIdQueryVariables = Exact<{
  specializationId: Scalars['String'];
}>;


export type GetServicesBySpecializationIdQuery = { __typename?: 'Query', getServicesBySpecializationId: Array<{ __typename?: 'Service', _id: string, description: string, name: string, price: number }> };

export type GetSessionsByPeriodQueryVariables = Exact<{
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
}>;


export type GetSessionsByPeriodQuery = { __typename?: 'Query', getSessionPeriodTime: Array<{ __typename?: 'Session', price: number, startDate: string, clinicPercnetage: number, doctor?: { __typename?: 'Doctor', _id: string, fullName: string } | null, service?: { __typename?: 'Service', name: string, _id: string } | null }> };

export type GetSpecializationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSpecializationsQuery = { __typename?: 'Query', getSpecializations: Array<{ __typename?: 'Specialization', _id: string, name: string, description: string, colorCodeGradient?: { __typename?: 'ColorCodeGradientGraph', start?: string | null, finish?: string | null } | null, doctors: Array<{ __typename?: 'Doctor', _id: string, fullName: string, acceptableAgeGroup?: string | null, description?: string | null, email: string, numOfRatings: number, phoneNumber: string, rating?: number | null, avatar?: { __typename?: 'PhotoURL', xl?: string | null } | null, specializations?: Array<{ __typename?: 'Specialization', name: string }> | null, workTimes?: Array<{ __typename?: 'WorkTime', endTime: any, startTime: any }> | null }>, photoURL?: { __typename?: 'PhotoURL', xl?: string | null } | null }> };

export type GetBookingsByDateQueryVariables = Exact<{
  firstDate: Scalars['DateTime'];
  secondDate: Scalars['DateTime'];
}>;


export type GetBookingsByDateQuery = { __typename?: 'Query', getBookingsByDate: Array<{ __typename?: 'Booking', _id: string, progress: BookingProgress, startDate: any, doctor?: { __typename?: 'Doctor', _id: string, fullName: string } | null, service?: { __typename?: 'Service', _id: string, name: string, price: number } | null, user: { __typename?: 'User', _id: string, fullName: string, phoneNumber: string } }> };

export type GetUpcomingBookingsQueryQueryVariables = Exact<{
  page: Scalars['Int'];
}>;


export type GetUpcomingBookingsQueryQuery = { __typename?: 'Query', getUpcomingBookings: Array<{ __typename?: 'Booking', _id: string, startDate: any, endDate: any }> };

export type LoginAdminQueryVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginAdminQuery = { __typename?: 'Query', loginAdmin: { __typename?: 'Admin', token?: string | null } };

export type MkbSearchQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type MkbSearchQuery = { __typename?: 'Query', searchICD: Array<{ __typename?: 'ICD', code: string, description: string }> };

export type GetActiveSessionQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetActiveSessionQuery = { __typename?: 'Query', getActiveSessionByUserId?: { __typename?: 'Session', _id: string, count: number, startDate: string, booking?: { __typename?: 'Booking', service?: { __typename?: 'Service', name: string } | null } | null } | null };


export const CancelBookingDocument = gql`
    mutation cancelBooking($bookingId: String!) {
  cancelBooking(bookingId: $bookingId) {
    _id
    service {
      name
    }
  }
}
    `;
export type CancelBookingMutationFn = Apollo.MutationFunction<CancelBookingMutation, CancelBookingMutationVariables>;

/**
 * __useCancelBookingMutation__
 *
 * To run a mutation, you first call `useCancelBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelBookingMutation, { data, loading, error }] = useCancelBookingMutation({
 *   variables: {
 *      bookingId: // value for 'bookingId'
 *   },
 * });
 */
export function useCancelBookingMutation(baseOptions?: Apollo.MutationHookOptions<CancelBookingMutation, CancelBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelBookingMutation, CancelBookingMutationVariables>(CancelBookingDocument, options);
      }
export type CancelBookingMutationHookResult = ReturnType<typeof useCancelBookingMutation>;
export type CancelBookingMutationResult = Apollo.MutationResult<CancelBookingMutation>;
export type CancelBookingMutationOptions = Apollo.BaseMutationOptions<CancelBookingMutation, CancelBookingMutationVariables>;
export const CheckSmsVerificationCodeDocument = gql`
    mutation CheckSMSVerificationCode($code: String!, $phoneNumber: String!) {
  checkSMSVerificationCode(code: $code, phoneNumber: $phoneNumber) {
    _id
    token
    phoneNumber
  }
}
    `;
export type CheckSmsVerificationCodeMutationFn = Apollo.MutationFunction<CheckSmsVerificationCodeMutation, CheckSmsVerificationCodeMutationVariables>;

/**
 * __useCheckSmsVerificationCodeMutation__
 *
 * To run a mutation, you first call `useCheckSmsVerificationCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckSmsVerificationCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkSmsVerificationCodeMutation, { data, loading, error }] = useCheckSmsVerificationCodeMutation({
 *   variables: {
 *      code: // value for 'code'
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useCheckSmsVerificationCodeMutation(baseOptions?: Apollo.MutationHookOptions<CheckSmsVerificationCodeMutation, CheckSmsVerificationCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CheckSmsVerificationCodeMutation, CheckSmsVerificationCodeMutationVariables>(CheckSmsVerificationCodeDocument, options);
      }
export type CheckSmsVerificationCodeMutationHookResult = ReturnType<typeof useCheckSmsVerificationCodeMutation>;
export type CheckSmsVerificationCodeMutationResult = Apollo.MutationResult<CheckSmsVerificationCodeMutation>;
export type CheckSmsVerificationCodeMutationOptions = Apollo.BaseMutationOptions<CheckSmsVerificationCodeMutation, CheckSmsVerificationCodeMutationVariables>;
export const CreateBookingDocument = gql`
    mutation CreateBooking($doctorId: String!, $endDate: DateTime, $serviceId: String, $startDate: DateTime!, $userId: String) {
  createBooking(
    doctorId: $doctorId
    serviceId: $serviceId
    startDate: $startDate
    userId: $userId
    endDate: $endDate
  ) {
    _id
    startDate
  }
}
    `;
export type CreateBookingMutationFn = Apollo.MutationFunction<CreateBookingMutation, CreateBookingMutationVariables>;

/**
 * __useCreateBookingMutation__
 *
 * To run a mutation, you first call `useCreateBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookingMutation, { data, loading, error }] = useCreateBookingMutation({
 *   variables: {
 *      doctorId: // value for 'doctorId'
 *      endDate: // value for 'endDate'
 *      serviceId: // value for 'serviceId'
 *      startDate: // value for 'startDate'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreateBookingMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookingMutation, CreateBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBookingMutation, CreateBookingMutationVariables>(CreateBookingDocument, options);
      }
export type CreateBookingMutationHookResult = ReturnType<typeof useCreateBookingMutation>;
export type CreateBookingMutationResult = Apollo.MutationResult<CreateBookingMutation>;
export type CreateBookingMutationOptions = Apollo.BaseMutationOptions<CreateBookingMutation, CreateBookingMutationVariables>;
export const AddDoctorToAppointmentBlankDocument = gql`
    mutation AddDoctorToAppointmentBlank($appointmentBlankId: String!, $doctorId: String!) {
  addDoctorToAppointmentBlank(
    appointmentBlankId: $appointmentBlankId
    doctorId: $doctorId
  ) {
    _id
  }
}
    `;
export type AddDoctorToAppointmentBlankMutationFn = Apollo.MutationFunction<AddDoctorToAppointmentBlankMutation, AddDoctorToAppointmentBlankMutationVariables>;

/**
 * __useAddDoctorToAppointmentBlankMutation__
 *
 * To run a mutation, you first call `useAddDoctorToAppointmentBlankMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDoctorToAppointmentBlankMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDoctorToAppointmentBlankMutation, { data, loading, error }] = useAddDoctorToAppointmentBlankMutation({
 *   variables: {
 *      appointmentBlankId: // value for 'appointmentBlankId'
 *      doctorId: // value for 'doctorId'
 *   },
 * });
 */
export function useAddDoctorToAppointmentBlankMutation(baseOptions?: Apollo.MutationHookOptions<AddDoctorToAppointmentBlankMutation, AddDoctorToAppointmentBlankMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddDoctorToAppointmentBlankMutation, AddDoctorToAppointmentBlankMutationVariables>(AddDoctorToAppointmentBlankDocument, options);
      }
export type AddDoctorToAppointmentBlankMutationHookResult = ReturnType<typeof useAddDoctorToAppointmentBlankMutation>;
export type AddDoctorToAppointmentBlankMutationResult = Apollo.MutationResult<AddDoctorToAppointmentBlankMutation>;
export type AddDoctorToAppointmentBlankMutationOptions = Apollo.BaseMutationOptions<AddDoctorToAppointmentBlankMutation, AddDoctorToAppointmentBlankMutationVariables>;
export const CreateForwardDocument = gql`
    mutation CreateForward($serviceId: [String!]!, $userId: String!) {
  createForward(serviceIds: $serviceId, userId: $userId) {
    _id
  }
}
    `;
export type CreateForwardMutationFn = Apollo.MutationFunction<CreateForwardMutation, CreateForwardMutationVariables>;

/**
 * __useCreateForwardMutation__
 *
 * To run a mutation, you first call `useCreateForwardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateForwardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createForwardMutation, { data, loading, error }] = useCreateForwardMutation({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreateForwardMutation(baseOptions?: Apollo.MutationHookOptions<CreateForwardMutation, CreateForwardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateForwardMutation, CreateForwardMutationVariables>(CreateForwardDocument, options);
      }
export type CreateForwardMutationHookResult = ReturnType<typeof useCreateForwardMutation>;
export type CreateForwardMutationResult = Apollo.MutationResult<CreateForwardMutation>;
export type CreateForwardMutationOptions = Apollo.BaseMutationOptions<CreateForwardMutation, CreateForwardMutationVariables>;
export const CreateServiceDocument = gql`
    mutation CreateService($description: String!, $doctorIds: [String!], $durationInMinutes: Int, $isShown: Boolean, $name: String!, $price: Int!, $specializationId: String!) {
  createService(
    description: $description
    doctorIds: $doctorIds
    durationInMinutes: $durationInMinutes
    isShown: $isShown
    name: $name
    price: $price
    specializationIds: [$specializationId]
  ) {
    _id
    name
  }
}
    `;
export type CreateServiceMutationFn = Apollo.MutationFunction<CreateServiceMutation, CreateServiceMutationVariables>;

/**
 * __useCreateServiceMutation__
 *
 * To run a mutation, you first call `useCreateServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createServiceMutation, { data, loading, error }] = useCreateServiceMutation({
 *   variables: {
 *      description: // value for 'description'
 *      doctorIds: // value for 'doctorIds'
 *      durationInMinutes: // value for 'durationInMinutes'
 *      isShown: // value for 'isShown'
 *      name: // value for 'name'
 *      price: // value for 'price'
 *      specializationId: // value for 'specializationId'
 *   },
 * });
 */
export function useCreateServiceMutation(baseOptions?: Apollo.MutationHookOptions<CreateServiceMutation, CreateServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateServiceMutation, CreateServiceMutationVariables>(CreateServiceDocument, options);
      }
export type CreateServiceMutationHookResult = ReturnType<typeof useCreateServiceMutation>;
export type CreateServiceMutationResult = Apollo.MutationResult<CreateServiceMutation>;
export type CreateServiceMutationOptions = Apollo.BaseMutationOptions<CreateServiceMutation, CreateServiceMutationVariables>;
export const EditSessionBlankDocument = gql`
    mutation EditSessionBlank($complaint: EditComplaintInput!, $diagnose: EditDiagnoseInput!, $inspections: EditInspections!, $appointmentResults: EditAppointmentResultsInput, $appointmentBlankId: String!) {
  editSessionBlank(
    complaints: $complaint
    diagnose: $diagnose
    inspections: $inspections
    appointmentResults: $appointmentResults
    appointmentBlankId: $appointmentBlankId
  ) {
    __typename
  }
}
    `;
export type EditSessionBlankMutationFn = Apollo.MutationFunction<EditSessionBlankMutation, EditSessionBlankMutationVariables>;

/**
 * __useEditSessionBlankMutation__
 *
 * To run a mutation, you first call `useEditSessionBlankMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditSessionBlankMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editSessionBlankMutation, { data, loading, error }] = useEditSessionBlankMutation({
 *   variables: {
 *      complaint: // value for 'complaint'
 *      diagnose: // value for 'diagnose'
 *      inspections: // value for 'inspections'
 *      appointmentResults: // value for 'appointmentResults'
 *      appointmentBlankId: // value for 'appointmentBlankId'
 *   },
 * });
 */
export function useEditSessionBlankMutation(baseOptions?: Apollo.MutationHookOptions<EditSessionBlankMutation, EditSessionBlankMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditSessionBlankMutation, EditSessionBlankMutationVariables>(EditSessionBlankDocument, options);
      }
export type EditSessionBlankMutationHookResult = ReturnType<typeof useEditSessionBlankMutation>;
export type EditSessionBlankMutationResult = Apollo.MutationResult<EditSessionBlankMutation>;
export type EditSessionBlankMutationOptions = Apollo.BaseMutationOptions<EditSessionBlankMutation, EditSessionBlankMutationVariables>;
export const EditDoctorDocument = gql`
    mutation EditDoctor($doctorId: String!, $fullName: String, $email: String, $description: String, $acceptableAgeGroup: AcceptableAgeGroup, $dateOfBirth: DateTime, $avatar: Upload, $experiences: [ExperienceInput!], $languages: [LanguageInput!], $password: String, $phoneNumber: String, $startingExperienceDate: DateTime, $workTimes: [WorkTimeInput!], $cabinet: String) {
  editDoctor(
    doctorId: $doctorId
    acceptableAgeGroup: $acceptableAgeGroup
    avatar: $avatar
    dateOfBirth: $dateOfBirth
    description: $description
    email: $email
    experiences: $experiences
    fullName: $fullName
    languages: $languages
    password: $password
    phoneNumber: $phoneNumber
    startingExperienceDate: $startingExperienceDate
    workTimes: $workTimes
    cabinet: $cabinet
  ) {
    _id
  }
}
    `;
export type EditDoctorMutationFn = Apollo.MutationFunction<EditDoctorMutation, EditDoctorMutationVariables>;

/**
 * __useEditDoctorMutation__
 *
 * To run a mutation, you first call `useEditDoctorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditDoctorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editDoctorMutation, { data, loading, error }] = useEditDoctorMutation({
 *   variables: {
 *      doctorId: // value for 'doctorId'
 *      fullName: // value for 'fullName'
 *      email: // value for 'email'
 *      description: // value for 'description'
 *      acceptableAgeGroup: // value for 'acceptableAgeGroup'
 *      dateOfBirth: // value for 'dateOfBirth'
 *      avatar: // value for 'avatar'
 *      experiences: // value for 'experiences'
 *      languages: // value for 'languages'
 *      password: // value for 'password'
 *      phoneNumber: // value for 'phoneNumber'
 *      startingExperienceDate: // value for 'startingExperienceDate'
 *      workTimes: // value for 'workTimes'
 *      cabinet: // value for 'cabinet'
 *   },
 * });
 */
export function useEditDoctorMutation(baseOptions?: Apollo.MutationHookOptions<EditDoctorMutation, EditDoctorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditDoctorMutation, EditDoctorMutationVariables>(EditDoctorDocument, options);
      }
export type EditDoctorMutationHookResult = ReturnType<typeof useEditDoctorMutation>;
export type EditDoctorMutationResult = Apollo.MutationResult<EditDoctorMutation>;
export type EditDoctorMutationOptions = Apollo.BaseMutationOptions<EditDoctorMutation, EditDoctorMutationVariables>;
export const EditDoctorAvatarDocument = gql`
    mutation EditDoctorAvatar($doctorId: String!, $image: Upload!) {
  editDoctorWithFile(doctorId: $doctorId, image: $image) {
    _id
    avatar {
      m
    }
  }
}
    `;
export type EditDoctorAvatarMutationFn = Apollo.MutationFunction<EditDoctorAvatarMutation, EditDoctorAvatarMutationVariables>;

/**
 * __useEditDoctorAvatarMutation__
 *
 * To run a mutation, you first call `useEditDoctorAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditDoctorAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editDoctorAvatarMutation, { data, loading, error }] = useEditDoctorAvatarMutation({
 *   variables: {
 *      doctorId: // value for 'doctorId'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useEditDoctorAvatarMutation(baseOptions?: Apollo.MutationHookOptions<EditDoctorAvatarMutation, EditDoctorAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditDoctorAvatarMutation, EditDoctorAvatarMutationVariables>(EditDoctorAvatarDocument, options);
      }
export type EditDoctorAvatarMutationHookResult = ReturnType<typeof useEditDoctorAvatarMutation>;
export type EditDoctorAvatarMutationResult = Apollo.MutationResult<EditDoctorAvatarMutation>;
export type EditDoctorAvatarMutationOptions = Apollo.BaseMutationOptions<EditDoctorAvatarMutation, EditDoctorAvatarMutationVariables>;
export const RegisterDoctorDocument = gql`
    mutation RegisterDoctor($fullName: String!, $email: String!, $description: String!, $acceptableAgeGroup: AcceptableAgeGroup!, $dateOfBirth: DateTime!, $avatar: Upload, $experience: [ExperienceInput!], $languages: [LanguageInput!]!, $password: String!, $phoneNumber: String!, $startingExperienceDate: DateTime!, $workTimes: [WorkTimeInput!], $cabinet: String!, $specializationIds: [String!]) {
  registerDoctor(
    acceptableAgeGroup: $acceptableAgeGroup
    avatar: $avatar
    dateOfBirth: $dateOfBirth
    description: $description
    email: $email
    experience: $experience
    fullName: $fullName
    languages: $languages
    password: $password
    phoneNumber: $phoneNumber
    startingExperienceDate: $startingExperienceDate
    workTimes: $workTimes
    cabinet: $cabinet
    specializationIds: $specializationIds
  ) {
    doctor {
      _id
      description
    }
  }
}
    `;
export type RegisterDoctorMutationFn = Apollo.MutationFunction<RegisterDoctorMutation, RegisterDoctorMutationVariables>;

/**
 * __useRegisterDoctorMutation__
 *
 * To run a mutation, you first call `useRegisterDoctorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterDoctorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerDoctorMutation, { data, loading, error }] = useRegisterDoctorMutation({
 *   variables: {
 *      fullName: // value for 'fullName'
 *      email: // value for 'email'
 *      description: // value for 'description'
 *      acceptableAgeGroup: // value for 'acceptableAgeGroup'
 *      dateOfBirth: // value for 'dateOfBirth'
 *      avatar: // value for 'avatar'
 *      experience: // value for 'experience'
 *      languages: // value for 'languages'
 *      password: // value for 'password'
 *      phoneNumber: // value for 'phoneNumber'
 *      startingExperienceDate: // value for 'startingExperienceDate'
 *      workTimes: // value for 'workTimes'
 *      cabinet: // value for 'cabinet'
 *      specializationIds: // value for 'specializationIds'
 *   },
 * });
 */
export function useRegisterDoctorMutation(baseOptions?: Apollo.MutationHookOptions<RegisterDoctorMutation, RegisterDoctorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterDoctorMutation, RegisterDoctorMutationVariables>(RegisterDoctorDocument, options);
      }
export type RegisterDoctorMutationHookResult = ReturnType<typeof useRegisterDoctorMutation>;
export type RegisterDoctorMutationResult = Apollo.MutationResult<RegisterDoctorMutation>;
export type RegisterDoctorMutationOptions = Apollo.BaseMutationOptions<RegisterDoctorMutation, RegisterDoctorMutationVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($dateOfBirth: String!, $email: String!, $fullName: String!, $phoneNumber: String!) {
  registerUser(
    dateOfBirth: $dateOfBirth
    email: $email
    fullName: $fullName
    phoneNumber: $phoneNumber
  ) {
    _id
    token
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      dateOfBirth: // value for 'dateOfBirth'
 *      email: // value for 'email'
 *      fullName: // value for 'fullName'
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const SendVerSmsDocument = gql`
    mutation SendVerSMS($phoneNumber: String!) {
  sendVerSMS(phoneNumber: $phoneNumber)
}
    `;
export type SendVerSmsMutationFn = Apollo.MutationFunction<SendVerSmsMutation, SendVerSmsMutationVariables>;

/**
 * __useSendVerSmsMutation__
 *
 * To run a mutation, you first call `useSendVerSmsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendVerSmsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendVerSmsMutation, { data, loading, error }] = useSendVerSmsMutation({
 *   variables: {
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useSendVerSmsMutation(baseOptions?: Apollo.MutationHookOptions<SendVerSmsMutation, SendVerSmsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendVerSmsMutation, SendVerSmsMutationVariables>(SendVerSmsDocument, options);
      }
export type SendVerSmsMutationHookResult = ReturnType<typeof useSendVerSmsMutation>;
export type SendVerSmsMutationResult = Apollo.MutationResult<SendVerSmsMutation>;
export type SendVerSmsMutationOptions = Apollo.BaseMutationOptions<SendVerSmsMutation, SendVerSmsMutationVariables>;
export const StartSesisonDocument = gql`
    mutation StartSesison($bookingId: String!) {
  startSession(bookingId: $bookingId) {
    _id
  }
}
    `;
export type StartSesisonMutationFn = Apollo.MutationFunction<StartSesisonMutation, StartSesisonMutationVariables>;

/**
 * __useStartSesisonMutation__
 *
 * To run a mutation, you first call `useStartSesisonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartSesisonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startSesisonMutation, { data, loading, error }] = useStartSesisonMutation({
 *   variables: {
 *      bookingId: // value for 'bookingId'
 *   },
 * });
 */
export function useStartSesisonMutation(baseOptions?: Apollo.MutationHookOptions<StartSesisonMutation, StartSesisonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartSesisonMutation, StartSesisonMutationVariables>(StartSesisonDocument, options);
      }
export type StartSesisonMutationHookResult = ReturnType<typeof useStartSesisonMutation>;
export type StartSesisonMutationResult = Apollo.MutationResult<StartSesisonMutation>;
export type StartSesisonMutationOptions = Apollo.BaseMutationOptions<StartSesisonMutation, StartSesisonMutationVariables>;
export const EndSessionDocument = gql`
    mutation EndSession($sessionId: String!) {
  endSession(sessionId: $sessionId) {
    _id
  }
}
    `;
export type EndSessionMutationFn = Apollo.MutationFunction<EndSessionMutation, EndSessionMutationVariables>;

/**
 * __useEndSessionMutation__
 *
 * To run a mutation, you first call `useEndSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEndSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [endSessionMutation, { data, loading, error }] = useEndSessionMutation({
 *   variables: {
 *      sessionId: // value for 'sessionId'
 *   },
 * });
 */
export function useEndSessionMutation(baseOptions?: Apollo.MutationHookOptions<EndSessionMutation, EndSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EndSessionMutation, EndSessionMutationVariables>(EndSessionDocument, options);
      }
export type EndSessionMutationHookResult = ReturnType<typeof useEndSessionMutation>;
export type EndSessionMutationResult = Apollo.MutationResult<EndSessionMutation>;
export type EndSessionMutationOptions = Apollo.BaseMutationOptions<EndSessionMutation, EndSessionMutationVariables>;
export const UploadSessionBlankDocument = gql`
    mutation UploadSessionBlank($complaint: CreateComplaint!, $diagnose: CreateDiagnose!, $inspections: CreateInspections!, $sessionId: String!, $appointmentResults: CreateAppointmentResults, $treatmentPlan: CreateTreatmentPlanGraph) {
  createSessionBlank(
    complaint: $complaint
    diagnose: $diagnose
    inspections: $inspections
    sessionId: $sessionId
    appointmentResults: $appointmentResults
    treatmentPlan: $treatmentPlan
  ) {
    __typename
  }
}
    `;
export type UploadSessionBlankMutationFn = Apollo.MutationFunction<UploadSessionBlankMutation, UploadSessionBlankMutationVariables>;

/**
 * __useUploadSessionBlankMutation__
 *
 * To run a mutation, you first call `useUploadSessionBlankMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadSessionBlankMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadSessionBlankMutation, { data, loading, error }] = useUploadSessionBlankMutation({
 *   variables: {
 *      complaint: // value for 'complaint'
 *      diagnose: // value for 'diagnose'
 *      inspections: // value for 'inspections'
 *      sessionId: // value for 'sessionId'
 *      appointmentResults: // value for 'appointmentResults'
 *      treatmentPlan: // value for 'treatmentPlan'
 *   },
 * });
 */
export function useUploadSessionBlankMutation(baseOptions?: Apollo.MutationHookOptions<UploadSessionBlankMutation, UploadSessionBlankMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadSessionBlankMutation, UploadSessionBlankMutationVariables>(UploadSessionBlankDocument, options);
      }
export type UploadSessionBlankMutationHookResult = ReturnType<typeof useUploadSessionBlankMutation>;
export type UploadSessionBlankMutationResult = Apollo.MutationResult<UploadSessionBlankMutation>;
export type UploadSessionBlankMutationOptions = Apollo.BaseMutationOptions<UploadSessionBlankMutation, UploadSessionBlankMutationVariables>;
export const GetUpcomingBookingsOfDoctorDocument = gql`
    query getUpcomingBookingsOfDoctor {
  getUpcomingBookingsOfDoctor {
    _id
    doctor {
      _id
      fullName
    }
    startDate
    progress
    user {
      fullName
      phoneNumber
      _id
    }
    service {
      name
    }
    endDate
  }
}
    `;

/**
 * __useGetUpcomingBookingsOfDoctorQuery__
 *
 * To run a query within a React component, call `useGetUpcomingBookingsOfDoctorQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUpcomingBookingsOfDoctorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUpcomingBookingsOfDoctorQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUpcomingBookingsOfDoctorQuery(baseOptions?: Apollo.QueryHookOptions<GetUpcomingBookingsOfDoctorQuery, GetUpcomingBookingsOfDoctorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUpcomingBookingsOfDoctorQuery, GetUpcomingBookingsOfDoctorQueryVariables>(GetUpcomingBookingsOfDoctorDocument, options);
      }
export function useGetUpcomingBookingsOfDoctorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUpcomingBookingsOfDoctorQuery, GetUpcomingBookingsOfDoctorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUpcomingBookingsOfDoctorQuery, GetUpcomingBookingsOfDoctorQueryVariables>(GetUpcomingBookingsOfDoctorDocument, options);
        }
export type GetUpcomingBookingsOfDoctorQueryHookResult = ReturnType<typeof useGetUpcomingBookingsOfDoctorQuery>;
export type GetUpcomingBookingsOfDoctorLazyQueryHookResult = ReturnType<typeof useGetUpcomingBookingsOfDoctorLazyQuery>;
export type GetUpcomingBookingsOfDoctorQueryResult = Apollo.QueryResult<GetUpcomingBookingsOfDoctorQuery, GetUpcomingBookingsOfDoctorQueryVariables>;
export const GetBookingsOfDoctorDocument = gql`
    query getBookingsOfDoctor($doctorId: String!, $firstDate: DateTime!, $secondDate: DateTime!) {
  getBookingsByDoctorIdAndDates(
    doctorId: $doctorId
    secondDate: $secondDate
    firstDate: $firstDate
  ) {
    _id
    doctor {
      _id
      fullName
    }
    startDate
    progress
    user {
      fullName
      phoneNumber
      _id
    }
    service {
      name
      price
    }
    endDate
  }
}
    `;

/**
 * __useGetBookingsOfDoctorQuery__
 *
 * To run a query within a React component, call `useGetBookingsOfDoctorQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookingsOfDoctorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookingsOfDoctorQuery({
 *   variables: {
 *      doctorId: // value for 'doctorId'
 *      firstDate: // value for 'firstDate'
 *      secondDate: // value for 'secondDate'
 *   },
 * });
 */
export function useGetBookingsOfDoctorQuery(baseOptions: Apollo.QueryHookOptions<GetBookingsOfDoctorQuery, GetBookingsOfDoctorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBookingsOfDoctorQuery, GetBookingsOfDoctorQueryVariables>(GetBookingsOfDoctorDocument, options);
      }
export function useGetBookingsOfDoctorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookingsOfDoctorQuery, GetBookingsOfDoctorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBookingsOfDoctorQuery, GetBookingsOfDoctorQueryVariables>(GetBookingsOfDoctorDocument, options);
        }
export type GetBookingsOfDoctorQueryHookResult = ReturnType<typeof useGetBookingsOfDoctorQuery>;
export type GetBookingsOfDoctorLazyQueryHookResult = ReturnType<typeof useGetBookingsOfDoctorLazyQuery>;
export type GetBookingsOfDoctorQueryResult = Apollo.QueryResult<GetBookingsOfDoctorQuery, GetBookingsOfDoctorQueryVariables>;
export const GetStatsOfDoctorByPeriodsOfTimeDocument = gql`
    query getStatsOfDoctorByPeriodsOfTime($startDate: DateTime!, $secondDate: DateTime!) {
  getStatsOfDoctorByPeriodsOfTime(firstDate: $startDate, secondDate: $secondDate) {
    totalMoneyEarnt
    totalNumOfSessions
  }
}
    `;

/**
 * __useGetStatsOfDoctorByPeriodsOfTimeQuery__
 *
 * To run a query within a React component, call `useGetStatsOfDoctorByPeriodsOfTimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStatsOfDoctorByPeriodsOfTimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStatsOfDoctorByPeriodsOfTimeQuery({
 *   variables: {
 *      startDate: // value for 'startDate'
 *      secondDate: // value for 'secondDate'
 *   },
 * });
 */
export function useGetStatsOfDoctorByPeriodsOfTimeQuery(baseOptions: Apollo.QueryHookOptions<GetStatsOfDoctorByPeriodsOfTimeQuery, GetStatsOfDoctorByPeriodsOfTimeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStatsOfDoctorByPeriodsOfTimeQuery, GetStatsOfDoctorByPeriodsOfTimeQueryVariables>(GetStatsOfDoctorByPeriodsOfTimeDocument, options);
      }
export function useGetStatsOfDoctorByPeriodsOfTimeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStatsOfDoctorByPeriodsOfTimeQuery, GetStatsOfDoctorByPeriodsOfTimeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStatsOfDoctorByPeriodsOfTimeQuery, GetStatsOfDoctorByPeriodsOfTimeQueryVariables>(GetStatsOfDoctorByPeriodsOfTimeDocument, options);
        }
export type GetStatsOfDoctorByPeriodsOfTimeQueryHookResult = ReturnType<typeof useGetStatsOfDoctorByPeriodsOfTimeQuery>;
export type GetStatsOfDoctorByPeriodsOfTimeLazyQueryHookResult = ReturnType<typeof useGetStatsOfDoctorByPeriodsOfTimeLazyQuery>;
export type GetStatsOfDoctorByPeriodsOfTimeQueryResult = Apollo.QueryResult<GetStatsOfDoctorByPeriodsOfTimeQuery, GetStatsOfDoctorByPeriodsOfTimeQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($userId: String!) {
  getUserByID(userId: $userId) {
    fullName
    phoneNumber
    dateOfBirth
    phoneNumber
    email
  }
}
    `;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const GetActiveSessionByUserIdDocument = gql`
    query GetActiveSessionByUserId($userId: String!) {
  getActiveSessionByUserId(userId: $userId) {
    _id
    count
    startDate
    booking {
      service {
        name
      }
      doctor {
        _id
      }
    }
  }
}
    `;

/**
 * __useGetActiveSessionByUserIdQuery__
 *
 * To run a query within a React component, call `useGetActiveSessionByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActiveSessionByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActiveSessionByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetActiveSessionByUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetActiveSessionByUserIdQuery, GetActiveSessionByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetActiveSessionByUserIdQuery, GetActiveSessionByUserIdQueryVariables>(GetActiveSessionByUserIdDocument, options);
      }
export function useGetActiveSessionByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetActiveSessionByUserIdQuery, GetActiveSessionByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetActiveSessionByUserIdQuery, GetActiveSessionByUserIdQueryVariables>(GetActiveSessionByUserIdDocument, options);
        }
export type GetActiveSessionByUserIdQueryHookResult = ReturnType<typeof useGetActiveSessionByUserIdQuery>;
export type GetActiveSessionByUserIdLazyQueryHookResult = ReturnType<typeof useGetActiveSessionByUserIdLazyQuery>;
export type GetActiveSessionByUserIdQueryResult = Apollo.QueryResult<GetActiveSessionByUserIdQuery, GetActiveSessionByUserIdQueryVariables>;
export const GetAllDoctorsDocument = gql`
    query GetAllDoctors {
  getAllDoctors {
    _id
    fullName
    acceptableAgeGroup
    description
    email
    fullName
    numOfRatings
    phoneNumber
    rating
    upcomingBookings {
      _id
      startDate
      endDate
    }
    avatar {
      xl
    }
    specializations {
      name
    }
    workTimes {
      endTime
      startTime
    }
  }
}
    `;

/**
 * __useGetAllDoctorsQuery__
 *
 * To run a query within a React component, call `useGetAllDoctorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllDoctorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllDoctorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllDoctorsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllDoctorsQuery, GetAllDoctorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllDoctorsQuery, GetAllDoctorsQueryVariables>(GetAllDoctorsDocument, options);
      }
export function useGetAllDoctorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllDoctorsQuery, GetAllDoctorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllDoctorsQuery, GetAllDoctorsQueryVariables>(GetAllDoctorsDocument, options);
        }
export type GetAllDoctorsQueryHookResult = ReturnType<typeof useGetAllDoctorsQuery>;
export type GetAllDoctorsLazyQueryHookResult = ReturnType<typeof useGetAllDoctorsLazyQuery>;
export type GetAllDoctorsQueryResult = Apollo.QueryResult<GetAllDoctorsQuery, GetAllDoctorsQueryVariables>;
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  listUsers {
    fullName
    _id
    phoneNumber
    photoURL {
      m
    }
  }
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetAppointmentBlanksOfUserDocument = gql`
    query GetAppointmentBlanksOfUser($userId: String!) {
  getAppointmentBlanksOfUser(userId: $userId, page: 1) {
    _id
    createdAt
    complaint {
      complaint
      sicknessTimeDuration
      reason
      doctor {
        fullName
        avatar {
          m
        }
      }
      doctorId
    }
    owners {
      doctor {
        _id
        fullName
      }
    }
    diagnose {
      diagnose
      deseaseDBCode
      natureOfTheDesease
      preliminary
      doctor {
        fullName
        avatar {
          m
        }
      }
      doctorId
    }
    inspections {
      description
      doctor {
        fullName
        avatar {
          m
        }
      }
      doctorId
      images {
        m
      }
      _id
    }
  }
}
    `;

/**
 * __useGetAppointmentBlanksOfUserQuery__
 *
 * To run a query within a React component, call `useGetAppointmentBlanksOfUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppointmentBlanksOfUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppointmentBlanksOfUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetAppointmentBlanksOfUserQuery(baseOptions: Apollo.QueryHookOptions<GetAppointmentBlanksOfUserQuery, GetAppointmentBlanksOfUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAppointmentBlanksOfUserQuery, GetAppointmentBlanksOfUserQueryVariables>(GetAppointmentBlanksOfUserDocument, options);
      }
export function useGetAppointmentBlanksOfUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAppointmentBlanksOfUserQuery, GetAppointmentBlanksOfUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAppointmentBlanksOfUserQuery, GetAppointmentBlanksOfUserQueryVariables>(GetAppointmentBlanksOfUserDocument, options);
        }
export type GetAppointmentBlanksOfUserQueryHookResult = ReturnType<typeof useGetAppointmentBlanksOfUserQuery>;
export type GetAppointmentBlanksOfUserLazyQueryHookResult = ReturnType<typeof useGetAppointmentBlanksOfUserLazyQuery>;
export type GetAppointmentBlanksOfUserQueryResult = Apollo.QueryResult<GetAppointmentBlanksOfUserQuery, GetAppointmentBlanksOfUserQueryVariables>;
export const GetDoctorByIdDocument = gql`
    query GetDoctorByID($id: String!) {
  getDoctorByID(doctorId: $id) {
    _id
    acceptableAgeGroup
    avatar {
      m
    }
    cabinet
    description
    deseases {
      _id
    }
    email
    experiences {
      data {
        institutionName
        years
        specialty
      }
      name
    }
    fullName
    languages {
      language
      type
    }
    doctorPercentage
    numOfRatings
    phoneNumber
    rating
    specializations {
      _id
      name
    }
    workTimes {
      endTime
      startTime
    }
  }
}
    `;

/**
 * __useGetDoctorByIdQuery__
 *
 * To run a query within a React component, call `useGetDoctorByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDoctorByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDoctorByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDoctorByIdQuery(baseOptions: Apollo.QueryHookOptions<GetDoctorByIdQuery, GetDoctorByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDoctorByIdQuery, GetDoctorByIdQueryVariables>(GetDoctorByIdDocument, options);
      }
export function useGetDoctorByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDoctorByIdQuery, GetDoctorByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDoctorByIdQuery, GetDoctorByIdQueryVariables>(GetDoctorByIdDocument, options);
        }
export type GetDoctorByIdQueryHookResult = ReturnType<typeof useGetDoctorByIdQuery>;
export type GetDoctorByIdLazyQueryHookResult = ReturnType<typeof useGetDoctorByIdLazyQuery>;
export type GetDoctorByIdQueryResult = Apollo.QueryResult<GetDoctorByIdQuery, GetDoctorByIdQueryVariables>;
export const GetDoctorSearchDocument = gql`
    query GetDoctorSearch {
  getAllDoctors {
    _id
    fullName
    acceptableAgeGroup
    description
    email
    fullName
    numOfRatings
    phoneNumber
    rating
    upcomingBookings {
      _id
      startDate
      endDate
    }
    avatar {
      xl
    }
    specializations {
      name
    }
    workTimes {
      endTime
      startTime
    }
  }
}
    `;

/**
 * __useGetDoctorSearchQuery__
 *
 * To run a query within a React component, call `useGetDoctorSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDoctorSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDoctorSearchQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDoctorSearchQuery(baseOptions?: Apollo.QueryHookOptions<GetDoctorSearchQuery, GetDoctorSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDoctorSearchQuery, GetDoctorSearchQueryVariables>(GetDoctorSearchDocument, options);
      }
export function useGetDoctorSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDoctorSearchQuery, GetDoctorSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDoctorSearchQuery, GetDoctorSearchQueryVariables>(GetDoctorSearchDocument, options);
        }
export type GetDoctorSearchQueryHookResult = ReturnType<typeof useGetDoctorSearchQuery>;
export type GetDoctorSearchLazyQueryHookResult = ReturnType<typeof useGetDoctorSearchLazyQuery>;
export type GetDoctorSearchQueryResult = Apollo.QueryResult<GetDoctorSearchQuery, GetDoctorSearchQueryVariables>;
export const GetAllDoctorsQueryDocument = gql`
    query GetAllDoctorsQuery {
  getAllDoctors {
    _id
    acceptableAgeGroup
    avatar {
      m
    }
    description
    email
    fullName
    numOfRatings
    phoneNumber
    rating
    specializations {
      name
      _id
    }
  }
}
    `;

/**
 * __useGetAllDoctorsQueryQuery__
 *
 * To run a query within a React component, call `useGetAllDoctorsQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllDoctorsQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllDoctorsQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllDoctorsQueryQuery(baseOptions?: Apollo.QueryHookOptions<GetAllDoctorsQueryQuery, GetAllDoctorsQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllDoctorsQueryQuery, GetAllDoctorsQueryQueryVariables>(GetAllDoctorsQueryDocument, options);
      }
export function useGetAllDoctorsQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllDoctorsQueryQuery, GetAllDoctorsQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllDoctorsQueryQuery, GetAllDoctorsQueryQueryVariables>(GetAllDoctorsQueryDocument, options);
        }
export type GetAllDoctorsQueryQueryHookResult = ReturnType<typeof useGetAllDoctorsQueryQuery>;
export type GetAllDoctorsQueryLazyQueryHookResult = ReturnType<typeof useGetAllDoctorsQueryLazyQuery>;
export type GetAllDoctorsQueryQueryResult = Apollo.QueryResult<GetAllDoctorsQueryQuery, GetAllDoctorsQueryQueryVariables>;
export const GetAllDoctorsSearchDocument = gql`
    query GetAllDoctorsSearch {
  getAllDoctors {
    _id
    fullName
    specializations {
      _id
      name
    }
  }
}
    `;

/**
 * __useGetAllDoctorsSearchQuery__
 *
 * To run a query within a React component, call `useGetAllDoctorsSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllDoctorsSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllDoctorsSearchQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllDoctorsSearchQuery(baseOptions?: Apollo.QueryHookOptions<GetAllDoctorsSearchQuery, GetAllDoctorsSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllDoctorsSearchQuery, GetAllDoctorsSearchQueryVariables>(GetAllDoctorsSearchDocument, options);
      }
export function useGetAllDoctorsSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllDoctorsSearchQuery, GetAllDoctorsSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllDoctorsSearchQuery, GetAllDoctorsSearchQueryVariables>(GetAllDoctorsSearchDocument, options);
        }
export type GetAllDoctorsSearchQueryHookResult = ReturnType<typeof useGetAllDoctorsSearchQuery>;
export type GetAllDoctorsSearchLazyQueryHookResult = ReturnType<typeof useGetAllDoctorsSearchLazyQuery>;
export type GetAllDoctorsSearchQueryResult = Apollo.QueryResult<GetAllDoctorsSearchQuery, GetAllDoctorsSearchQueryVariables>;
export const GetServiceByDoctorIdDocument = gql`
    query GetServiceByDoctorId($doctorId: String!) {
  getServicesByDoctorId(doctorId: $doctorId) {
    _id
    name
  }
}
    `;

/**
 * __useGetServiceByDoctorIdQuery__
 *
 * To run a query within a React component, call `useGetServiceByDoctorIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceByDoctorIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceByDoctorIdQuery({
 *   variables: {
 *      doctorId: // value for 'doctorId'
 *   },
 * });
 */
export function useGetServiceByDoctorIdQuery(baseOptions: Apollo.QueryHookOptions<GetServiceByDoctorIdQuery, GetServiceByDoctorIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServiceByDoctorIdQuery, GetServiceByDoctorIdQueryVariables>(GetServiceByDoctorIdDocument, options);
      }
export function useGetServiceByDoctorIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServiceByDoctorIdQuery, GetServiceByDoctorIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServiceByDoctorIdQuery, GetServiceByDoctorIdQueryVariables>(GetServiceByDoctorIdDocument, options);
        }
export type GetServiceByDoctorIdQueryHookResult = ReturnType<typeof useGetServiceByDoctorIdQuery>;
export type GetServiceByDoctorIdLazyQueryHookResult = ReturnType<typeof useGetServiceByDoctorIdLazyQuery>;
export type GetServiceByDoctorIdQueryResult = Apollo.QueryResult<GetServiceByDoctorIdQuery, GetServiceByDoctorIdQueryVariables>;
export const GetServicesByIdDocument = gql`
    query GetServicesById($serviceId: String!) {
  getServiceById(serviceId: $serviceId) {
    price
    name
  }
}
    `;

/**
 * __useGetServicesByIdQuery__
 *
 * To run a query within a React component, call `useGetServicesByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServicesByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServicesByIdQuery({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useGetServicesByIdQuery(baseOptions: Apollo.QueryHookOptions<GetServicesByIdQuery, GetServicesByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServicesByIdQuery, GetServicesByIdQueryVariables>(GetServicesByIdDocument, options);
      }
export function useGetServicesByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServicesByIdQuery, GetServicesByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServicesByIdQuery, GetServicesByIdQueryVariables>(GetServicesByIdDocument, options);
        }
export type GetServicesByIdQueryHookResult = ReturnType<typeof useGetServicesByIdQuery>;
export type GetServicesByIdLazyQueryHookResult = ReturnType<typeof useGetServicesByIdLazyQuery>;
export type GetServicesByIdQueryResult = Apollo.QueryResult<GetServicesByIdQuery, GetServicesByIdQueryVariables>;
export const GetServicesByDoctorIdsDocument = gql`
    query GetServicesByDoctorIds($doctorId: [String!]!, $page: Int!) {
  getServicesByDoctorIds(doctorId: $doctorId, page: $page) {
    _id
    description
    name
    price
  }
}
    `;

/**
 * __useGetServicesByDoctorIdsQuery__
 *
 * To run a query within a React component, call `useGetServicesByDoctorIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServicesByDoctorIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServicesByDoctorIdsQuery({
 *   variables: {
 *      doctorId: // value for 'doctorId'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetServicesByDoctorIdsQuery(baseOptions: Apollo.QueryHookOptions<GetServicesByDoctorIdsQuery, GetServicesByDoctorIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServicesByDoctorIdsQuery, GetServicesByDoctorIdsQueryVariables>(GetServicesByDoctorIdsDocument, options);
      }
export function useGetServicesByDoctorIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServicesByDoctorIdsQuery, GetServicesByDoctorIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServicesByDoctorIdsQuery, GetServicesByDoctorIdsQueryVariables>(GetServicesByDoctorIdsDocument, options);
        }
export type GetServicesByDoctorIdsQueryHookResult = ReturnType<typeof useGetServicesByDoctorIdsQuery>;
export type GetServicesByDoctorIdsLazyQueryHookResult = ReturnType<typeof useGetServicesByDoctorIdsLazyQuery>;
export type GetServicesByDoctorIdsQueryResult = Apollo.QueryResult<GetServicesByDoctorIdsQuery, GetServicesByDoctorIdsQueryVariables>;
export const GetServicesBySpecializationIdDocument = gql`
    query GetServicesBySpecializationId($specializationId: String!) {
  getServicesBySpecializationId(page: 1, specializationId: $specializationId) {
    _id
    description
    name
    price
  }
}
    `;

/**
 * __useGetServicesBySpecializationIdQuery__
 *
 * To run a query within a React component, call `useGetServicesBySpecializationIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServicesBySpecializationIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServicesBySpecializationIdQuery({
 *   variables: {
 *      specializationId: // value for 'specializationId'
 *   },
 * });
 */
export function useGetServicesBySpecializationIdQuery(baseOptions: Apollo.QueryHookOptions<GetServicesBySpecializationIdQuery, GetServicesBySpecializationIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServicesBySpecializationIdQuery, GetServicesBySpecializationIdQueryVariables>(GetServicesBySpecializationIdDocument, options);
      }
export function useGetServicesBySpecializationIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServicesBySpecializationIdQuery, GetServicesBySpecializationIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServicesBySpecializationIdQuery, GetServicesBySpecializationIdQueryVariables>(GetServicesBySpecializationIdDocument, options);
        }
export type GetServicesBySpecializationIdQueryHookResult = ReturnType<typeof useGetServicesBySpecializationIdQuery>;
export type GetServicesBySpecializationIdLazyQueryHookResult = ReturnType<typeof useGetServicesBySpecializationIdLazyQuery>;
export type GetServicesBySpecializationIdQueryResult = Apollo.QueryResult<GetServicesBySpecializationIdQuery, GetServicesBySpecializationIdQueryVariables>;
export const GetSessionsByPeriodDocument = gql`
    query GetSessionsByPeriod($startTime: DateTime!, $endTime: DateTime!) {
  getSessionPeriodTime(startTime: $startTime, endTime: $endTime) {
    price
    startDate
    doctor {
      _id
      fullName
    }
    service {
      name
      _id
    }
    clinicPercnetage
  }
}
    `;

/**
 * __useGetSessionsByPeriodQuery__
 *
 * To run a query within a React component, call `useGetSessionsByPeriodQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSessionsByPeriodQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSessionsByPeriodQuery({
 *   variables: {
 *      startTime: // value for 'startTime'
 *      endTime: // value for 'endTime'
 *   },
 * });
 */
export function useGetSessionsByPeriodQuery(baseOptions: Apollo.QueryHookOptions<GetSessionsByPeriodQuery, GetSessionsByPeriodQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSessionsByPeriodQuery, GetSessionsByPeriodQueryVariables>(GetSessionsByPeriodDocument, options);
      }
export function useGetSessionsByPeriodLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSessionsByPeriodQuery, GetSessionsByPeriodQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSessionsByPeriodQuery, GetSessionsByPeriodQueryVariables>(GetSessionsByPeriodDocument, options);
        }
export type GetSessionsByPeriodQueryHookResult = ReturnType<typeof useGetSessionsByPeriodQuery>;
export type GetSessionsByPeriodLazyQueryHookResult = ReturnType<typeof useGetSessionsByPeriodLazyQuery>;
export type GetSessionsByPeriodQueryResult = Apollo.QueryResult<GetSessionsByPeriodQuery, GetSessionsByPeriodQueryVariables>;
export const GetSpecializationsDocument = gql`
    query GetSpecializations {
  getSpecializations {
    _id
    name
    description
    colorCodeGradient {
      start
      finish
    }
    doctors {
      _id
      fullName
      acceptableAgeGroup
      description
      email
      fullName
      numOfRatings
      phoneNumber
      rating
      avatar {
        xl
      }
      specializations {
        name
      }
      workTimes {
        endTime
        startTime
      }
    }
    photoURL {
      xl
    }
  }
}
    `;

/**
 * __useGetSpecializationsQuery__
 *
 * To run a query within a React component, call `useGetSpecializationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSpecializationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSpecializationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSpecializationsQuery(baseOptions?: Apollo.QueryHookOptions<GetSpecializationsQuery, GetSpecializationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSpecializationsQuery, GetSpecializationsQueryVariables>(GetSpecializationsDocument, options);
      }
export function useGetSpecializationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSpecializationsQuery, GetSpecializationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSpecializationsQuery, GetSpecializationsQueryVariables>(GetSpecializationsDocument, options);
        }
export type GetSpecializationsQueryHookResult = ReturnType<typeof useGetSpecializationsQuery>;
export type GetSpecializationsLazyQueryHookResult = ReturnType<typeof useGetSpecializationsLazyQuery>;
export type GetSpecializationsQueryResult = Apollo.QueryResult<GetSpecializationsQuery, GetSpecializationsQueryVariables>;
export const GetBookingsByDateDocument = gql`
    query GetBookingsByDate($firstDate: DateTime!, $secondDate: DateTime!) {
  getBookingsByDate(page: 1, firstDate: $firstDate, secondDate: $secondDate) {
    _id
    doctor {
      _id
      fullName
    }
    progress
    service {
      _id
      name
      price
    }
    user {
      _id
      fullName
      phoneNumber
    }
    startDate
  }
}
    `;

/**
 * __useGetBookingsByDateQuery__
 *
 * To run a query within a React component, call `useGetBookingsByDateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookingsByDateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookingsByDateQuery({
 *   variables: {
 *      firstDate: // value for 'firstDate'
 *      secondDate: // value for 'secondDate'
 *   },
 * });
 */
export function useGetBookingsByDateQuery(baseOptions: Apollo.QueryHookOptions<GetBookingsByDateQuery, GetBookingsByDateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBookingsByDateQuery, GetBookingsByDateQueryVariables>(GetBookingsByDateDocument, options);
      }
export function useGetBookingsByDateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookingsByDateQuery, GetBookingsByDateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBookingsByDateQuery, GetBookingsByDateQueryVariables>(GetBookingsByDateDocument, options);
        }
export type GetBookingsByDateQueryHookResult = ReturnType<typeof useGetBookingsByDateQuery>;
export type GetBookingsByDateLazyQueryHookResult = ReturnType<typeof useGetBookingsByDateLazyQuery>;
export type GetBookingsByDateQueryResult = Apollo.QueryResult<GetBookingsByDateQuery, GetBookingsByDateQueryVariables>;
export const GetUpcomingBookingsQueryDocument = gql`
    query GetUpcomingBookingsQuery($page: Int!) {
  getUpcomingBookings(page: $page) {
    _id
    startDate
    endDate
  }
}
    `;

/**
 * __useGetUpcomingBookingsQueryQuery__
 *
 * To run a query within a React component, call `useGetUpcomingBookingsQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUpcomingBookingsQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUpcomingBookingsQueryQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetUpcomingBookingsQueryQuery(baseOptions: Apollo.QueryHookOptions<GetUpcomingBookingsQueryQuery, GetUpcomingBookingsQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUpcomingBookingsQueryQuery, GetUpcomingBookingsQueryQueryVariables>(GetUpcomingBookingsQueryDocument, options);
      }
export function useGetUpcomingBookingsQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUpcomingBookingsQueryQuery, GetUpcomingBookingsQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUpcomingBookingsQueryQuery, GetUpcomingBookingsQueryQueryVariables>(GetUpcomingBookingsQueryDocument, options);
        }
export type GetUpcomingBookingsQueryQueryHookResult = ReturnType<typeof useGetUpcomingBookingsQueryQuery>;
export type GetUpcomingBookingsQueryLazyQueryHookResult = ReturnType<typeof useGetUpcomingBookingsQueryLazyQuery>;
export type GetUpcomingBookingsQueryQueryResult = Apollo.QueryResult<GetUpcomingBookingsQueryQuery, GetUpcomingBookingsQueryQueryVariables>;
export const LoginAdminDocument = gql`
    query loginAdmin($email: String!, $password: String!) {
  loginAdmin(email: $email, password: $password) {
    token
  }
}
    `;

/**
 * __useLoginAdminQuery__
 *
 * To run a query within a React component, call `useLoginAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginAdminQuery({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginAdminQuery(baseOptions: Apollo.QueryHookOptions<LoginAdminQuery, LoginAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginAdminQuery, LoginAdminQueryVariables>(LoginAdminDocument, options);
      }
export function useLoginAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginAdminQuery, LoginAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginAdminQuery, LoginAdminQueryVariables>(LoginAdminDocument, options);
        }
export type LoginAdminQueryHookResult = ReturnType<typeof useLoginAdminQuery>;
export type LoginAdminLazyQueryHookResult = ReturnType<typeof useLoginAdminLazyQuery>;
export type LoginAdminQueryResult = Apollo.QueryResult<LoginAdminQuery, LoginAdminQueryVariables>;
export const MkbSearchDocument = gql`
    query MKBSearch($search: String!) {
  searchICD(query: $search) {
    code
    description
  }
}
    `;

/**
 * __useMkbSearchQuery__
 *
 * To run a query within a React component, call `useMkbSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useMkbSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMkbSearchQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useMkbSearchQuery(baseOptions: Apollo.QueryHookOptions<MkbSearchQuery, MkbSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MkbSearchQuery, MkbSearchQueryVariables>(MkbSearchDocument, options);
      }
export function useMkbSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MkbSearchQuery, MkbSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MkbSearchQuery, MkbSearchQueryVariables>(MkbSearchDocument, options);
        }
export type MkbSearchQueryHookResult = ReturnType<typeof useMkbSearchQuery>;
export type MkbSearchLazyQueryHookResult = ReturnType<typeof useMkbSearchLazyQuery>;
export type MkbSearchQueryResult = Apollo.QueryResult<MkbSearchQuery, MkbSearchQueryVariables>;
export const GetActiveSessionDocument = gql`
    query GetActiveSession($userId: String!) {
  getActiveSessionByUserId(userId: $userId) {
    _id
    count
    startDate
    booking {
      service {
        name
      }
    }
  }
}
    `;

/**
 * __useGetActiveSessionQuery__
 *
 * To run a query within a React component, call `useGetActiveSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActiveSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActiveSessionQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetActiveSessionQuery(baseOptions: Apollo.QueryHookOptions<GetActiveSessionQuery, GetActiveSessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetActiveSessionQuery, GetActiveSessionQueryVariables>(GetActiveSessionDocument, options);
      }
export function useGetActiveSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetActiveSessionQuery, GetActiveSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetActiveSessionQuery, GetActiveSessionQueryVariables>(GetActiveSessionDocument, options);
        }
export type GetActiveSessionQueryHookResult = ReturnType<typeof useGetActiveSessionQuery>;
export type GetActiveSessionLazyQueryHookResult = ReturnType<typeof useGetActiveSessionLazyQuery>;
export type GetActiveSessionQueryResult = Apollo.QueryResult<GetActiveSessionQuery, GetActiveSessionQueryVariables>;
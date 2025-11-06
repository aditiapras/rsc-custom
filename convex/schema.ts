import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Keep the existing documents table
  documents: defineTable({
    title: v.string(),
    content: v.any(),
    ownerId: v.optional(v.string()),
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
  })
    .index("by_ownerId", ["ownerId"])
    .index("by_title", ["title"]),

  // Submission table
  submissions: defineTable({
    name: v.string(),
    slug: v.string(),
    categoryId: v.id("submissionCategories"),
    status: v.string(),
    openDate: v.optional(v.number()),
    closeDate: v.optional(v.number()),
    quota: v.number(),
    academicYear: v.string(),
    authorId: v.string(),
    description: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_authorId", ["authorId"])
    .index("by_slug", ["slug"])
    .index("by_status", ["status"]),

  // SubmissionCategory table
  submissionCategories: defineTable({
    name: v.string(),
    slug: v.string(),
    authorId: v.string(),
    description: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_authorId", ["authorId"])
    .index("by_slug", ["slug"]),

  // Participant table
  participants: defineTable({
    submissionId: v.id("submissions"),
    submissionStatus: v.string(),
    name: v.string(),
    nickname: v.string(),
    nik: v.string(),
    nisn: v.string(),
    dateOfBirth: v.number(),
    placeOfBirth: v.string(),
    gender: v.string(),
    religion: v.string(),
    hobby: v.string(),
    aspiration: v.string(),
    nationality: v.string(),
    birthOrder: v.number(),
    totalSiblings: v.number(),
    birthStatus: v.string(),
    bloodType: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    userId: v.string(),
    siblings: v.optional(v.boolean()),
    siblingsName: v.optional(v.string()),
    siblingsGrade: v.optional(v.string()),
    medicalHistory: v.optional(v.string()),
    majorIllness: v.optional(v.string()),
    minorIllness: v.optional(v.string()),
    isCompleted: v.boolean(),
    isSubmitted: v.boolean(),
  })
    .index("by_userId", ["userId"])
    .index("by_submissionId", ["submissionId"])
    .index("by_nik", ["nik"]),

  // ParticipantAddress table
  participantAddresses: defineTable({
    participantId: v.id("participants"),
    address: v.string(),
    district: v.string(),
    subDistrict: v.string(),
    city: v.string(),
    province: v.string(),
    postalCode: v.string(),
    isSubmitted: v.boolean(),
  }).index("by_participantId", ["participantId"]),

  // ParticipantParent table
  participantParents: defineTable({
    participantId: v.id("participants"),
    parentPhone: v.string(),
    parentEmail: v.string(),
    fatherName: v.string(),
    fatherNationalId: v.string(),
    fatherBirthPlace: v.string(),
    fatherBirthDate: v.number(),
    fatherReligion: v.string(),
    fatherOccupation: v.string(),
    fatherEducation: v.string(),
    fatherIncome: v.string(),
    fatherCitizenship: v.string(),
    motherName: v.string(),
    motherNationalId: v.string(),
    motherBirthPlace: v.string(),
    motherBirthDate: v.number(),
    motherReligion: v.string(),
    motherOccupation: v.string(),
    motherEducation: v.string(),
    motherIncome: v.string(),
    motherCitizenship: v.string(),
    isSubmitted: v.boolean(),
  }).index("by_participantId", ["participantId"]),

  // ParticipantEducation table
  participantEducations: defineTable({
    participantId: v.id("participants"),
    schoolName: v.optional(v.string()),
    schoolAddress: v.optional(v.string()),
    schoolCity: v.optional(v.string()),
    schoolDistrict: v.optional(v.string()),
    schoolSubDistrict: v.optional(v.string()),
    schoolProvince: v.optional(v.string()),
    schoolPostalCode: v.optional(v.string()),
    schoolPhone: v.optional(v.string()),
    schoolEmail: v.optional(v.string()),
    isSubmitted: v.boolean(),
  }).index("by_participantId", ["participantId"]),

  // ParticipantDocument table
  participantDocuments: defineTable({
    participantId: v.id("participants"),
    isSubmitted: v.boolean(),
    photo: v.optional(v.string()),
    familyCard: v.optional(v.string()),
    birthCertificate: v.optional(v.string()),
    skhus: v.optional(v.string()),
    graduationCertificate: v.optional(v.string()),
  }).index("by_participantId", ["participantId"]),

  // Files table for Convex Storage uploads
  files: defineTable({
    storageId: v.id("_storage"),
    url: v.string(),
    name: v.string(),
    type: v.string(),
    size: v.number(),
    ownerId: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_ownerId", ["ownerId"]),
});

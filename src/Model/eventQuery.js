//model for blogs database collections
import mongoose from "mongoose";
const eventSchema = new mongoose.Schema(
  {
    eventname: {
      type: String,
      required: true,
      uppercase: true,
    },
    organization: {
      type: String,
      required: true,
      uppercase: true,
    },
    TypeOfEvent: {
      type: String,
      required: true,
      trim: true,
    },
    EventDate: {
      type: String,
      required: true,
    },
    EventLocation: {
      type: String,
      required: true,
    },
    ExpectedParticipants: {
      type: Number,
      required: true,
    },
    EventDuration: {
      type: String,
      required: true,
    },
    organizerName: {
      type: String,
      required: true,
      uppercase: true,
    },
    organizerEmail: {
      type: String,
      required: true,
      lowercase: true,
    },
    organizerPhone: {
      type: Number,
      required: true,
      lowercase: true,
      min:10
    },
    AdditionInfo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const EventQuery =
  mongoose.models.EventQuery || mongoose.model("EventQuery", eventSchema);

export default EventQuery;

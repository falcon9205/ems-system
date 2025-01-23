"use client";

import { useState } from "react";
import React from "react";
import Goodpopup from "@/components/goodPopup/goodPopup";

export default function EventOrganizationForm() {
  const [eventname, setEventname] = useState("");
  const [organization, setOrganization] = useState("");
  const [TypeOfEvent, setTypeOfEvent] = useState("");
  const [EventDate, setEventDate] = useState("");
  const [EventLocation, setEventLocation] = useState("");
  const [ExpectedParticipants, setExpectedParticipants] = useState("");
  const [EventDuration, setEventDuration] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [organizerEmail, setOrganizerEmail] = useState("");
  const [organizerPhone, setOrganizerPhone] = useState("");
  const [AdditionInfo, setAdditionInfo] = useState("");
  const [sendButton, setSendButton] = useState("Submit Event Details");
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    // User data for TeleCRM
    const user = {
      eventname,
      organization,
      TypeOfEvent,
      EventDate,
      EventLocation,
      ExpectedParticipants,
      EventDuration,
      organizerName,
      organizerEmail,
      organizerPhone,
      AdditionInfo,
    };

    try {
      setSendButton("Sending...");

      // Call your custom TeleCRM API endpoint
      const apiResponse = await fetch("/api/eventQuery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'X-Custom-Header': process.env.NEXT_PUBLIC_FRONTEND,
        },
        body: JSON.stringify({
          eventname,
            organization,
            TypeOfEvent,
            EventDate,
            EventLocation,
            ExpectedParticipants,
            EventDuration,
            organizerName,
            organizerEmail,
            organizerPhone,
            AdditionInfo,
        }),
      });

      // Reset form and close popup after successful submission
     
      
      setEventname("");
                setOrganization("");
                setTypeOfEvent("");
                setEventDate("");
                setEventLocation("");
                setExpectedParticipants("");
                setEventDuration("");
                setOrganizerName("");
                setOrganizerEmail("");
                setOrganizerPhone("");
                setAdditionInfo("");
                setSendButton("Submit Event Details");
                setIsOpen(true)
                setMsg("We’ve received your query! Our team will get back to you shortly.")
    } catch (error) {
      setSendButton("Send");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className=" md:px-[20%] mx-auto p-6 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800  shadow-lg py-24"
      >
        <h2 className="text-3xl text-cyan-500 font-bold text-center mb-6">
          Event Organization Form
        </h2>

        <div className="space-y-6 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-6">
          {/* Event Name */}
          <div className="sm:w-[calc(50%-12px)]">
            <label
              htmlFor="eventname"
              className="block text-sm font-medium text-gray-300"
            >
              Event Name
            </label>
            <input
              id="eventname"
              type="text"
              placeholder="Enter the event name"
              required
              value={eventname}
              onChange={(e) => setEventname(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Organization/Institution Name */}
          <div className="sm:w-[calc(50%-12px)]">
            <label
              htmlFor="organization"
              className="block text-sm font-medium text-gray-300"
            >
              Organization/Institution Name
            </label>
            <input
              id="organization"
              type="text"
              placeholder="Enter the name of the organization"
              required
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Type of Event */}
          <div className="sm:w-[calc(50%-12px)]">
            <label
              htmlFor="TypeOfEvent"
              className="block text-sm font-medium text-gray-300"
            >
              Type of Event
            </label>
            <select
              id="TypeOfEvent"
              required
              value={TypeOfEvent}
              onChange={(e) => setTypeOfEvent(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select event type</option>
              <option value="seminar">Seminar</option>
              <option value="workshop">Workshop</option>
              <option value="conference">Conference</option>
              <option value="networking">Networking Event</option>
              <option value="festival">Festival</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Event Date */}
          <div className="sm:w-[calc(50%-12px)]">
            <label
              htmlFor="EventDate"
              className="block text-sm font-medium text-gray-300"
            >
              Event Date
            </label>
            <input
              id="EventDate"
              type="date"
              value={EventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Event Location */}
          <div className="sm:w-[calc(50%-12px)]">
            <label
              htmlFor="EventLocation"
              className="block text-sm font-medium text-gray-300"
            >
              Event Location
            </label>
            <input
              id="EventLocation"
              type="text"
              placeholder="Enter the event location"
              required
              value={EventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Expected Participants */}
          <div className="sm:w-[calc(50%-12px)]">
            <label
              htmlFor="ExpectedParticipants"
              className="block text-sm font-medium text-gray-300"
            >
              Expected Participants
            </label>
            <input
              id="ExpectedParticipants"
              type="number"
              placeholder="Estimated number of participants"
              required
              value={ExpectedParticipants}
              onChange={(e) => setExpectedParticipants(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Event Duration */}
          <div className="sm:w-[calc(50%-12px)]">
            <label
              htmlFor="EventDuration"
              className="block text-sm font-medium text-gray-300"
            >
              Event Duration
            </label>
            <input
              id="EventDuration"
              type="text"
              placeholder="Duration of the event (e.g., 3 hours)"
              required
              value={EventDuration}
              onChange={(e) => setEventDuration(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Organizer's Name */}
          <div className="sm:w-[calc(50%-12px)]">
            <label
              htmlFor="organizerName"
              className="block text-sm font-medium text-gray-300"
            >
              Organizer&apos;s Name
            </label>
            <input
              id="organizerName"
              type="text"
              placeholder="Enter your name"
              required
              value={organizerName}
              onChange={(e) => setOrganizerName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Organizer's Email */}
          <div className="sm:w-[calc(50%-12px)]">
            <label
              htmlFor="organizerEmail"
              className="block text-sm font-medium text-gray-300"
            >
              Organizer&apos;s Email
            </label>
            <input
              id="organizerEmail"
              type="email"
              placeholder="Enter your email"
              required
              value={organizerEmail}
              onChange={(e) => setOrganizerEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Organizer's Phone */}
          <div className="sm:w-[calc(50%-12px)]">
            <label
              htmlFor="organizerPhone"
              className="block text-sm font-medium text-gray-300"
            >
              Organizer&apos;s Phone
            </label>
            <input
              id="organizerPhone"
              type="number"
              placeholder="Enter your phone number"
              required
              value={organizerPhone}
              onChange={(e) => setOrganizerPhone(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Additional Info */}
          <div className="sm:w-full">
            <label
              htmlFor="AdditionInfo"
              className="block text-sm font-medium text-gray-300"
            >
              Additional Information
            </label>
            <textarea
              id="AdditionInfo"
              placeholder="Any additional information..."
              value={AdditionInfo}
              required
              onChange={(e) => setAdditionInfo(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {sendButton}
        </button>
      </form>
      <Goodpopup isOpen={isOpen} message={msg} onClose={handleClose} />
     
    </>
  );
}

// TODO: Import useForm, zodResolver, axios, useNavigate, useState, and noteSchema
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { noteSchema } from "../schema/notes";




import { Save } from "lucide-react";

const CreateNoteForm = () => {
  // TODO: Setup isSubmitting state with useState
  const [isSubmitting, setIsSubmitting] = useState(false);
  // TODO: create navigate variable and set to useNavigate()
  const navigate = useNavigate();

  // TODO: Set up the form with useForm from react-hook-form and zodResolver from @hookform/resolvers/zod
  const form = useForm({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const { register, handleSubmit, formState: { errors } } = form;

  const sendToTheServer = async (data) => {
    // TODO: Send the data to the server
    // TODO: Use axios to create a new note in the server using the endpoint http://localhost:3001/api/notes
    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:3001/api/notes", data);
      console.log("Note created successfully:", response.data);
      navigate("/notes"); // Redirect to the notes page after successful creation
    } catch (error) {
      console.error("Error creating note:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const onSubmit = (data) => {
    console.log("Form submitted with data:", data);
    sendToTheServer(data);
  };
  const onError = (errors) => {
    console.error("Form submission errors:", errors);
  };

  return (
    <>
    <h1>Create Note</h1>
    {/* TODO: Setup the form with TailwindCSS, create a form with the following fields: title, content, and submit button */}
    <form onSubmit={handleSubmit(sendToTheServer)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          {...register("title")}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
            errors.title ? "border-red-500" : ""
          }`}
        />
        {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>}
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          {...register("content")}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
            errors.content ? "border-red-500" : ""
          }`}
        />
        {errors.content && <p className="mt-2 text-sm text-red-600">{errors.content.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <Save className="mr-2 h-5 w-5" />
      Save Note
      </button>
    </form>
    </>
  );
};

export default CreateNoteForm;

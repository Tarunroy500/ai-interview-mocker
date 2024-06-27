"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAiModal";
import { LoaderCircle } from "lucide-react";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [jobDescription, setJobDescription] = useState();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobExperience, jobDescription);
    const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDescription}, Years of Experience: ${jobExperience}, Depends on this information please give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} Interview question with Answered in Json Format, Give Question and Answered as field in JSON`;
    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(MockJsonResp);
    setLoading(false);
  };
  return (
    <div>
      <div className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all">
        <h2
          className="font-bold text-lg text-center"
          onClick={() => setOpenDialog(true)}
        >
          + Add New
        </h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interviewing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add Details about your job position/role, Job description
                    and years of experience
                  </h2>
                  <div className="mt-7 my-3">
                    <label htmlFor="">Job Role/Job Position</label>
                    <Input
                      onChange={(e) => setJobPosition(e.target.value)}
                      required
                      placeholder="Ex. Full Stack Developer"
                    />
                  </div>
                  <div className="my-3">
                    <label htmlFor="">
                      Job Description/ Tech Stack (In Short)
                    </label>
                    <Textarea
                      onChange={(e) => setJobDescription(e.target.value)}
                      required
                      placeholder="Ex. React, Angular, NodeJs, MySql etc"
                    />
                  </div>
                  <div className="my-3">
                    <label htmlFor="">Years of experience</label>
                    <Input
                      onChange={(e) => setJobExperience(e.target.value)}
                      required
                      type="number"
                      max="100"
                      placeholder="Eg. 5"
                    />
                  </div>
                </div>

                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Generating From AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;

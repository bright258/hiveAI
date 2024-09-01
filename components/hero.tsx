"use client"

import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { Input } from "./ui/input"
import { Button } from "./ui/button"
import DockLive from "./dock-live"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com';

const Hero = () => {
  const [email, setEmail] = useState("")

  const signUp = async (email: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/sign-up`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      await response.json();
      toast("Done. Thank you!");
    } catch (error) {
      console.error('Error during sign up:', error);
      toast("An error occurred. Please try again.");
    }
  };

  return (
    <div className="relative flex h-full max-w-full items-center justify-center overflow-hidden rounded-lg bg-background p-5 sm:p-10 mt-5 sm:mt-20">
      <section className="flex flex-col items-center justify-center space-y-5 sm:space-y-10">
        <div className="w-full text-center px-4 sm:px-0">
          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-semibold leading-tight text-neutral-900 dark:text-neutral-100">
            Join Our Waitlist
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-neutral-600 dark:text-neutral-300">
            Convert audio recordings of your lectures into Flash cards{" "}
            <b>to save time</b>. And <b>land that A-grade</b> faster
          </p>
          <form
            className="mt-4 flex flex-col items-center justify-center gap-4 w-full mx-auto py-5 max-w-full "
            action="#"
            method="post"
          >
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g jane@gmail.com"
              className="w-full lg:max-w-[400px] sm:w-[300px] md:w-[350px] lg:w-[400px] min-w-0 h-[45px] flex-1 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 dark:focus:ring-yellow-400"
              required
            />
            <Button
              className="w-full lg:max-w-[400px] sm:w-[300px] md:w-[350px] lg:w-[400px]"
              size="lg"
              onClick={async (event) => {
                event.preventDefault();
                if (email) {
                  await signUp(email);
                } else {
                  toast("Please enter your email");
                }
              }}
            >
              Submit
            </Button>
            <p className="text-sm sm:text-lg text-neutral-600 dark:text-neutral-300">
              Check us out on social media ⚡️
            </p>
            <DockLive />
          </form>
        </div>
      </section>
      <ToastContainer />
    </div>
  )
}

export default Hero

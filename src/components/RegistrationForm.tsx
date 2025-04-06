import React, { useState } from "react";
import styled from "styled-components";
import themeColor from "@/tools/themeColors";
import Input from "@/components/Input";
import Button from "./Button/Button";
import ProgressShow from "./Input/ProgressShow";

const FormContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 32px;
  background-color: #1e1e1e;
  border-radius: 12px;
  color: ${themeColor.colors.neutral.white};
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 32px;
`;

const FormSection = styled.div`
  flex: 1;
`;

const EventSection = styled.div`
  flex: 0 0 340px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 32px;
  color: ${themeColor.colors.neutral.white};
`;

const FormRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;

  & > * {
    flex: 1;
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;
`;

// const EventCard = styled.div`
//   background-color: #000;
//   border-radius: 12px;
//   overflow: hidden;
//   height: 100%;
// `;

/**
 * 
 * Organism component for the registration form.
 * 
 * RegistrationForm component for collecting user registration information.
 * This component displays a multi-step registration form with progress indicator,
 * input fields for user details, and a section for event information.
 * 
 * @returns {JSX.Element} A styled registration form with input fields and button
 */


export default function RegistrationForm(): JSX.Element {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
    experience: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    console.log("Form submitted:", formData);
  }

  return (
    <FormContainer>
      <ProgressShow steps={3} activeStep={1} />

      <ContentContainer>
        <FormSection>
          <Title>Let's get Started</Title>

          <form onSubmit={handleSubmit}>
            <FormRow>
              <Input
                label="First name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                fullWidth
              />

              <Input
                label="Last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                fullWidth
              />
            </FormRow>

            <Input
              label="Email address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@domain.com"
              fullWidth
            />

            <Input
              label="Phone number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="000-000-000"
              fullWidth
            />

            <FormRow>
              <Input
                label="Job title"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="Developer | Student etc."
                fullWidth
              />

              <Input
                label="Experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="2 years"
                fullWidth
              />
            </FormRow>

            <FormActions>
              <Button type="submit">Continue</Button>
            </FormActions>
          </form>
        </FormSection>

        <EventSection>
          {/* <EventCard
            meetupNumber="4"
            location="Embassy of Uzbekistan, 대한민국 서울 용산구"
            date="December 19, 13:00pm"
            speakers={speakersData}
          /> */}
        </EventSection>
      </ContentContainer>
    </FormContainer>
  );
}

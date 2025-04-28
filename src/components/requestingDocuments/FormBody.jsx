import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Step1 from "../../components/requestingDocuments/Step1";
import Step2 from "../../components/requestingDocuments/Step2";
import Step3 from "../../components/requestingDocuments/Step3";
import Reminder from "../../components/requestingDocuments/Reminder";

const FormBody = ({
  direction,
  currentStep,
  isLoading,
  setIsLoading,
  privacyConsent,
  setPrivacyConsent,
  setFormData,
  formData,
  handleChange,
  docType,
  setDocType,
  setFile,
  inputsLength,
  setInputsLength,
  setHasSelection,
  setHasFile,
  setHasInput,
}) => {
  // FOR ANIMATIONS
  const stepVariants = {
    hidden: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: { duration: 0.4, ease: "easeIn" },
    }),
  };
  return (
    <div
      className="custom-scrollbar overflow-y-scroll overflow-x-hidden"
      style={{ height: "clamp(25rem, 60dvh, 70rem)" }}
    >
      <AnimatePresence mode="wait" custom={direction}>
        {currentStep === 1 && (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={direction}
          >
            <Reminder
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              privacyConsent={privacyConsent}
              setPrivacyConsent={setPrivacyConsent}
              setFormData={setFormData}
              formData={formData}
              handleChange={handleChange}
            />
          </motion.div>
        )}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={direction}
          >
            <Step1 formData={formData} handleChange={handleChange} />
          </motion.div>
        )}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={direction}
          >
            <Step2 formData={formData} handleChange={handleChange} />
          </motion.div>
        )}
        {currentStep === 4 && (
          <motion.div
            key="step4"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={direction}
          >
            <Step3
              docType={docType}
              setDocType={setDocType}
              setFile={setFile}
              setInputsLength={setInputsLength}
              inputsLength={inputsLength}
              formData={formData}
              handleChange={handleChange}
              setHasSelection={setHasSelection}
              setHasFile={setHasFile}
              setHasInput={setHasInput}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormBody;

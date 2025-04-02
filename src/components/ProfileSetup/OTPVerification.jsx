import React from "react";
import { InputGroup, Form, Row, Col } from "react-bootstrap";

const OTPVerification = ({
  formData,
  otpInputs,
  handleOtpChange,
  resendOTP,
  isLoading,
  otpTimer,
}) => {
  return (
    <div>
      <p>
        {" "}
        A One-Time Password (OTP) has been sent to{" "}
        <span className="text-success fw-bold">{formData.receiverEmail}</span>.
        Please check your inbox to proceed.{" "}
      </p>
      <Row className="OTPContainer gap-1 px-2">
        {otpInputs.map((input, index) => (
          <Col key={index}>
            <InputGroup className="mb-3 ">
              <Form.Control
                type="number"
                maxLength={1}
                value={input}
                onChange={(event) => handleOtpChange(event, index)}
                placeholder=""
                aria-label=""
                aria-describedby="basic-addon1"
                autoFocus={index === 0} // Focus on the first input initially
                onFocus={(e) => e.target.select()} // Select the input on focus
                // disabled={}
              />
            </InputGroup>
          </Col>
        ))}
      </Row>
      <button
        type="button"
        className="btn btn-light"
        onClick={resendOTP}
        disabled={otpTimer != 0 || isLoading || !formData.receiverEmail}
      >
        <p className="m-0">
          {isLoading ? (
            <>Resending OTP</>
          ) : (
            <>
              {otpTimer === 0 ? (
                <>{isLoading ? <>Resending OTP</> : <>Resend OTP</>}</>
              ) : (
                <>
                  {isLoading ? <>Resending OTP</> : <>Resend OTP({otpTimer})</>}
                </>
              )}
            </>
          )}
        </p>
      </button>
    </div>
  );
};

export default OTPVerification;

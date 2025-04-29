import React from "react";
import { Form } from "react-bootstrap";
// Citizens Charter Step Component
const CitizensCharterStep = ({ formData, handleChange }) => {
  const cc1 = [
    {
      value: 1,
      id: "cc1_1",
      question: "I know what a CC is and I saw this office's CC.",
      tagalog: "Alam ko ang CC at nakita ko ito sa napuntahang tanggapan.",
    },
    {
      value: 2,
      id: "cc1_2",
      question: "I know what a CC is but I did NOT see this office's CC.",
      tagalog:
        "Alam ko ang CC pero hindi ko ito nakita sa napuntahang tanggapan.",
    },
    {
      value: 3,
      id: "cc1_3",
      question: "I learned of the CC only when I saw this office's CC.",
      tagalog:
        "Nalaman ko ang CC noon lamang nakita ko ito sa napuntahang tanggapan.",
    },
    {
      value: 4,
      id: "cc1_4",
      question:
        "I do not know what a CC is and I did not see one of this office. (Answer 'N/A' on CC2 and CC3).",
      tagalog:
        "Hindi ko alam kung ano ang CC at wala akong nakita sa napuntahang tanggapan (Lagyan ng tsek at 'N/A' sa CC2 at CC3).",
    },
  ];
  const cc2 = [
    {
      value: 1,
      id: "cc2_1",
      question: "Easy to see.",
      tagalog: "Madaling makita.",
    },
    {
      value: 2,
      id: "cc2_2",
      question: "Somewhat easy to see.",
      tagalog: "Medyo madaling makita.",
    },
    {
      value: 3,
      id: "cc2_3",
      question: "Difficult to see.",
      tagalog: "Mahirap makita.",
    },
    {
      value: 4,
      id: "cc2_4",
      question: "Not visible at all.",
      tagalog: "Hindi nakikita.",
    },
    {
      value: 5,
      id: "cc2_5",
      question: "N/A",
      tagalog: "",
    },
  ];
  const cc3 = [
    {
      value: 1,
      id: "cc3_1",
      question: "Helped very much.",
      tagalog: "Sobrang nakatulong.",
    },
    {
      value: 2,
      id: "cc3_2",
      question: "Somewhat helped.",
      tagalog: "Bahagyang nakatulong.",
    },
    {
      value: 3,
      id: "cc3_3",
      question: "Did not help.",
      tagalog: "Hindi nakatulong.",
    },
    {
      value: 4,
      id: "cc3_4",
      question: "N/A",
      tagalog: "",
    },
  ];

  return (
    <div className="container p-1">
      <div className="mb-4">
        <h6 className="fw-bold">
          INSTRUCTIONS: Choose your answer to the Citizen's Charter (CC)
          questions. The Citizen's Charter is an official document that reflects
          the services of a government agency/office including its requirement,
          fees and processing times among others. <br />
          <span
            className="fst-italic fw-normal text-muted"
            style={{ fontSize: "clamp(0.75rem, 1.75vw, .9rem)" }}
          >
            PANUTO: Piliin ang tumutugon sa iyong sagot sa Citizen's Charter
            (CC). Ang Citizen's Charter (CC) ay opisyal na dokumento na
            nagsasaad ng mga serbisyo sa isang ahensya ng gobyerno, kasama ang
            mga kakailanganin na dokumento, bayarin, at panahong gagugalin sa
            pagpoproseso.
          </span>
        </h6>
      </div>

      {/* CC1 Question */}
      <div className="row mb-4">
        <div className="col-12">
          <h6 className="m-0 mb-2 fw-bold">
            CC1: Which of the following best describes your awareness of a CC?
            <span
              className="fst-italic fw-normal text-muted"
              style={{ fontSize: "clamp(0.75rem, 1.75vw, .9rem)" }}
            >
              (Alin sa mga sumusunod ang naglarawan sa iyong kaalaman sa CC?)
            </span>
          </h6>
          {cc1.map((q1, index) => (
            <>
              <div key={index} className="mb-1">
                <Form.Check // prettier-ignore
                  type="checkbox"
                  label={
                    <>
                      <p className="m-0">
                        {index + 1}. {q1.question}
                        <span
                          className="fst-italic text-muted"
                          style={{ fontSize: "clamp(0.65rem, 1.75vw, .8rem)" }}
                        >
                          ({q1.tagalog})
                        </span>
                      </p>
                    </>
                  }
                  name="cc1"
                  id={`${q1.id}`}
                  value={`${q1.value}`}
                  checked={formData.cc1 === q1.value}
                  onChange={handleChange}
                />
              </div>
            </>
          ))}
        </div>
      </div>

      {/* CC2 Question */}
      <div className="row mb-4">
        <div className="col-12">
          <h6 className="m-0 mb-2 fw-bold">
            CC2: If aware of CC (answered 1-3 in CC1), would you say that the CC
            of this office was...?
            <span
              className="fst-italic fw-normal text-muted"
              style={{ fontSize: "clamp(0.75rem, 1.75vw, .9rem)" }}
            >
              (Kung alam ang CC (kung sinagutan ang 1-3 sa CC1), masasabi mo ba
              na ang CC ng napuntahang tanggapan ay...?)
            </span>
          </h6>
          {cc2.map((q2, index) => (
            <>
              <div key={index} className="mb-1">
                <Form.Check // prettier-ignore
                  type="checkbox"
                  label={
                    <>
                      <p className="m-0">
                        {index + 1}. {q2.question}
                        <span
                          className="fst-italic text-muted"
                          style={{ fontSize: "clamp(0.65rem, 1.75vw, .8rem)" }}
                        >
                          {q2.tagalog ? <>({q2.tagalog})</> : null}
                        </span>
                      </p>
                    </>
                  }
                  name="cc2"
                  id={`${q2.id}`}
                  value={`${q2.value}`}
                  checked={formData.cc2 === q2.value}
                  disabled={formData.cc1 === 4}
                  onChange={handleChange}
                />
              </div>
            </>
          ))}
        </div>
      </div>

      {/* CC3 Question */}
      <div className="row">
        <div className="col-12">
          <h6 className="m-0 fw-bold">
            CC3: If aware of CC (answered codes 1-3 in CC1), how much did the CC
            help you in your transaction?
            <span
              className="fst-italic fw-normal text-muted"
              style={{ fontSize: "clamp(0.75rem, 1.75vw, .9rem)" }}
            >
              (Kung alam ang CC (kung sinagutan ang 1-3 sa CC1), gaano
              nakatulong ang CC sa transaksyon mo?)
            </span>
          </h6>
          {cc3.map((q3, index) => (
            <>
              <div key={index} className="mb-1">
                <Form.Check // prettier-ignore
                  type="checkbox"
                  label={
                    <>
                      <p className="m-0">
                        {index + 1}. {q3.question}
                        <span
                          className="fst-italic text-muted"
                          style={{ fontSize: "clamp(0.65rem, 1.75vw, .8rem)" }}
                        >
                          {q3.tagalog ? <>({q3.tagalog})</> : null}
                        </span>
                      </p>
                    </>
                  }
                  name="cc3"
                  id={`${q3.id}`}
                  value={`${q3.value}`}
                  checked={formData.cc3 === q3.value}
                  disabled={formData.cc1 === 4}
                  onChange={handleChange}
                />
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitizensCharterStep;

import React from "react";
import { Form } from "react-bootstrap";
// Citizens Charter Step Component
const CitizensCharterStep = ({ formData, handleChange }) => {
  const cc1 = [
    {
      value: 1,
      id: "cc_1",
      question: "I know what a CC is and I saw this office's CC.",
      tagalog: "Alam ko ang CC at nakita ko ito sa napuntahang tanggapan.",
    },
    {
      value: 2,
      id: "cc_2",
      question: "I know what a CC is but I did NOT see this office's CC.",
      tagalog:
        "Alam ko ang CC pero hindi ko ito nakita sa napuntahang tanggapan.",
    },
    {
      value: 3,
      id: "cc_3",
      question: "I learned of the CC only when I saw this office's CC.",
      tagalog:
        "Nalaman ko ang CC noon lamang nakita ko ito sa napuntahang tanggapan.",
    },
    {
      value: 4,
      id: "cc_4",
      question:
        "I do not know what a CC is and I did not see one of this office. (Answer 'N/A' on CC2 and CC3)",
      tagalog:
        "Hindi ko alam kung ano ang CC at wala akong nakita sa napuntahang tanggapan (Lagyan ng tsek at 'N/A' sa CC2 at CC3)",
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
            className="fst-italic fw-normal"
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
          <p className="m-0 fw-bold">
            CC1: Which of the following best describes your awareness of a CC?
            <br />
            <span
              className="fst-italic fw-normal"
              style={{ fontSize: "clamp(0.75rem, 1.75vw, .9rem)" }}
            >
              (Alin sa mga sumusunod ang naglarawan sa iyong kaalaman sa CC?)
            </span>
          </p>
          {cc1.map((q1, index) => (
            <>
              <div key={index} className="mb-3">
                <Form.Check // prettier-ignore
                  type="checkbox"
                  label={
                    <>
                      <p>
                        {index + 1}. {q1.question} <br />
                        <span className="fst-italic">({q1.tagalog})</span>
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
          <h5>
            CC2: If aware of CC (answered 1-3 in CC1), would you say that the CC
            of this office was...?
          </h5>
          <p className="fst-italic">
            (Kung alam ang CC (kung sinagutan ang 1-3 sa CC1), masasabi mo ba na
            ang CC ng napuntahang tanggapan ay...?)
          </p>

          <div className="row">
            <div className="col-md-6">
              <div className="form-check mb-2">
                <input
                  className="form-check-input border-black"
                  type="radio"
                  name="cc2"
                  id="cc2_1"
                  value="1"
                  checked={formData.cc2 === 1}
                  onChange={handleChange}
                  disabled={formData.cc1 === 4}
                />
                <label className="form-check-label" htmlFor="cc2_1">
                  1. Easy to see (Madaling makita)
                </label>
              </div>

              <div className="form-check mb-2">
                <input
                  className="form-check-input border-black"
                  type="radio"
                  name="cc2"
                  id="cc2_2"
                  value="2"
                  checked={formData.cc2 === 2}
                  onChange={handleChange}
                  disabled={formData.cc1 === 4}
                />
                <label className="form-check-label" htmlFor="cc2_2">
                  2. Somewhat easy to see (Medyo madaling makita)
                </label>
              </div>

              <div className="form-check mb-2">
                <input
                  className="form-check-input border-black"
                  type="radio"
                  name="cc2"
                  id="cc2_3"
                  value="3"
                  checked={formData.cc2 === 3}
                  onChange={handleChange}
                  disabled={formData.cc1 === 4}
                />
                <label className="form-check-label" htmlFor="cc2_3">
                  3. Difficult to see (Mahirap makita)
                </label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-check mb-2">
                <input
                  className="form-check-input border-black"
                  type="radio"
                  name="cc2"
                  id="cc2_4"
                  value="4"
                  checked={formData.cc2 === 4}
                  onChange={handleChange}
                  disabled={formData.cc1 === 4}
                />
                <label className="form-check-label" htmlFor="cc2_4">
                  4. Not visible at all (Hindi nakikita) {formData.cc2}
                </label>
              </div>

              <div className="form-check mb-2">
                <input
                  className="form-check-input border-black"
                  type="radio"
                  name="cc2"
                  id="cc2_5"
                  value="5"
                  checked={formData.cc2 === 5 || formData.cc1 === 4}
                  onChange={handleChange}
                  disabled={formData.cc1 !== 4}
                />
                <label className="form-check-label" htmlFor="cc2_5">
                  5. N/A
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CC3 Question */}
      <div className="row mb-4">
        <div className="col-12">
          <h5>
            CC3: If aware of CC (answered codes 1-3 in CC1), how much did the CC
            help you in your transaction?
          </h5>
          <p className="fst-italic">
            (Kung alam ang CC (kung sinagutan ang 1-3 sa CC1), gaano nakatulong
            ang CC sa transaksyon mo?)
          </p>

          <div className="row">
            <div className="col-md-6">
              <div className="form-check mb-2">
                <input
                  className="form-check-input border-black"
                  type="radio"
                  name="cc3"
                  id="cc3_1"
                  value="1"
                  checked={formData.cc3 === 1}
                  onChange={handleChange}
                  disabled={formData.cc1 === 4}
                />
                <label className="form-check-label" htmlFor="cc3_1">
                  1. Helped very much (Sobrang nakatulong)
                </label>
              </div>

              <div className="form-check mb-2">
                <input
                  className="form-check-input border-black"
                  type="radio"
                  name="cc3"
                  id="cc3_2"
                  value="2"
                  checked={formData.cc3 === 2}
                  onChange={handleChange}
                  disabled={formData.cc1 === 4}
                />
                <label className="form-check-label" htmlFor="cc3_2">
                  2. Somewhat helped (Bahagyang nakatulong)
                </label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-check mb-2">
                <input
                  className="form-check-input border-black"
                  type="radio"
                  name="cc3"
                  id="cc3_3"
                  value="3"
                  checked={formData.cc3 === 3}
                  onChange={handleChange}
                  disabled={formData.cc1 === 4}
                />
                <label className="form-check-label" htmlFor="cc3_3">
                  3. Did not help (Hindi nakatulong)
                </label>
              </div>

              <div className="form-check mb-2">
                <input
                  className="form-check-input border-black"
                  type="radio"
                  name="cc3"
                  id="cc3_4"
                  value="4"
                  checked={formData.cc3 === 4 || formData.cc1 === 4}
                  onChange={handleChange}
                  disabled={formData.cc1 !== 4}
                />
                <label className="form-check-label" htmlFor="cc3_4">
                  4. N/A
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizensCharterStep;

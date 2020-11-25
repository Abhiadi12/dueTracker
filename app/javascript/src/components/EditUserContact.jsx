import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Validate from "react-validate-form";
import { Redirect, useHistory } from "react-router-dom";
import { getLoggedUser } from "../redux/auth/authActions";
import { updateContact } from "../redux/contact/contactActions";
import { setFlashMessage } from "../redux/flash/flashActions";
import { displayErrors, numberOfErrors } from "../js-code/error-helper";
import { userFormRules } from "../js-code/user-validator";
import useInput from "../hooks/useInput";
import {
  Form,
  Input,
  Segment,
  Divider,
  Button,
  Label,
} from "semantic-ui-react";

import axios from "axios";
const currentDateHelper = () => {
  let dtToday = new Date();
  let month = dtToday.getMonth() + 1;
  let day = dtToday.getDate();
  let year = dtToday.getFullYear();
  if (month < 10) month = "0" + month.toString();
  if (day < 10) day = "0" + day.toString();

  return year + "-" + month + "-" + day;
}; //help to disable the past dates

function EditUserContact(props) {
  const token = localStorage.getItem("token");
  const current_user = useSelector((state) => state.auth.user);
  const contact_id = props.match.params.id;
  const [name, bindName, , setNameInput] = useInput("");
  const [email, bindEmail, , setEmailInput] = useInput("");
  const [phone, bindPhone, , setPhoneInput] = useInput("");
  const [amount, bindAmount, , setAmountInput] = useInput(0);
  const [status, setStatus] = useState("select");
  const minDate = currentDateHelper();
  const [currentDate, bindCurrentDate, , setDateInput] = useInput(minDate);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(
          `/api/v1/users/${current_user.id}/contacts/${contact_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const {
          name,
          email,
          phone,
          amount,
          duestatus,
          timeperiod,
        } = response.data.data.attributes;
        setNameInput(name);
        setEmailInput(email);
        setPhoneInput(phone);
        setAmountInput(amount);
        setStatus(duestatus);
        setDateInput(timeperiod);
      } catch (error) {
        dispatch(setFlashMessage(error.response.data.message, "orange"));
      }
    };
    if (token && current_user.id) fetchContact();
    if (token && !current_user.id) dispatch(getLoggedUser(token));
  }, [current_user]);

  const history = useHistory();

  const customRules = {
    sameEmailNotAllowed: {
      test: (val) => val !== current_user.email,
      message: () => "You can't enter your registered email address",
    },
    samePhoneNotAllowed: {
      test: (val) => val !== current_user.phone,
      message: () => "You can't enter your own phone number as a contact",
    },
  };
  const rules = {
    ...userFormRules,
    ...customRules,
  };
  const validations = {
    name: ["required", "userNameRule"],
    email: [
      "required",
      "emailRule",
      "sameEmailNotAllowed",
      "sameEmailNotAllowed",
    ],
    phone: ["required", "phnNumRule", "samePhoneNotAllowed"],
    amount: ["required", "amountMustGreaterThanZero"],
  };

  const handleEditContact = (event) => {
    event.preventDefault();
    dispatch(
      updateContact(
        {
          name,
          email,
          phone,
          amount,
          duestatus: status,
          timeperiod: currentDate,
        },
        current_user.id,
        contact_id,
        token
      )
    );
  };

  const handleSelectInputChange = (event) => {
    setStatus(event.target.value);
  };

  if (token) {
    return (
      <Segment placeholder>
        <Label color="blue" ribbon>
          Edit your dues record here.
        </Label>
        <Divider color="grey" />
        <Validate validations={validations} rules={rules}>
          {({ validate, errorMessages, errorCount }) => (
            <Form onSubmit={handleEditContact}>
              <Form.Field
                error={numberOfErrors(errorMessages.name) > 0 ? true : false}
                required
              >
                <label>Name</label>
                <Input
                  placeholder="Enter Name Here"
                  name="name"
                  type="text"
                  {...bindName}
                  required
                  onBlur={validate}
                />
                <div className="error-message">
                  {errorMessages.name ? displayErrors(errorMessages.name) : ""}
                </div>
              </Form.Field>

              <Form.Field
                error={numberOfErrors(errorMessages.email) > 0 ? true : false}
                required
              >
                <label>Email</label>
                <Input
                  placeholder="Your Email"
                  name="email"
                  type="email"
                  {...bindEmail}
                  onBlur={validate}
                  required
                />
                <div className="error-message">
                  {errorMessages.email
                    ? displayErrors(errorMessages.email)
                    : ""}
                </div>
              </Form.Field>

              <Form.Field
                error={numberOfErrors(errorMessages.phone) > 0 ? true : false}
                required
              >
                <label>Contact Number</label>
                <Input
                  placeholder="Your Number"
                  name="phone"
                  type="text"
                  {...bindPhone}
                  onBlur={validate}
                  required
                />
                <div className="error-message">
                  {errorMessages.phone
                    ? displayErrors(errorMessages.phone)
                    : ""}
                </div>
              </Form.Field>

              <Form.Field
                error={numberOfErrors(errorMessages.amount) > 0 ? true : false}
                required
              >
                <label>Amount</label>
                <Input
                  labelPosition="right"
                  name="amount"
                  type="number"
                  {...bindAmount}
                  placeholder="Amount"
                  onBlur={validate}
                  required
                >
                  <Label basic>$</Label>
                  <input />
                  <Label>.00</Label>
                </Input>
                <div className="error-message">
                  {errorMessages.amount
                    ? displayErrors(errorMessages.amount)
                    : ""}
                </div>
              </Form.Field>

              <Form.Field required>
                <label>status</label>
                <select value={status} onChange={handleSelectInputChange}>
                  <option value="select" disabled>
                    Please select
                  </option>
                  <option value="pay">To Pay</option>
                  <option value="receive">To Recieve</option>
                </select>
              </Form.Field>

              <Form.Field>
                <label>Time period</label>
                <Input
                  type="date"
                  name="timeperiod"
                  {...bindCurrentDate}
                  min={minDate}
                />
              </Form.Field>

              <Button
                type="submit"
                disabled={errorCount === 0 ? false : true}
                primary
              >
                Add
              </Button>
            </Form>
          )}
        </Validate>
      </Segment>
    );
  } else {
    return <Redirect to="/login" />;
  }
}

export default EditUserContact;

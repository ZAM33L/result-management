import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const response = await axios.post("api/contact", {
        name,
        email,
        message,
        phone,
      });

      setSuccess(true);
      toast.success("Message sent successfully!");
      setTimeout(() => {
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setSuccess(false);
      }, 500);
    } catch (error) {
      console.error(error);
      alert("Error sending message");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Control
            type="text"
            value={name}
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter Your EmailID"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="phone" className="mb-3">
          <Form.Control
            type="text"
            value={phone}
            placeholder="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="message" className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Enter Your Message"
          />
        </Form.Group>

        <Button
          variant={success ? "success" : "primary"}
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Sending..." : success ? "Success" : "Send Message"}
        </Button>
      </Form>
      <ToastContainer />
    </>
  );
}

export default ContactForm;

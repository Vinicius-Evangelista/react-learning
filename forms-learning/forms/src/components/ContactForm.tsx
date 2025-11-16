'use client';

import { insertContact } from '@/data/insertContact';
import { useActionState } from 'react';


export function ContactForm() {
  const [
    { ok, error, errors, formData },
    formAction,
    isPending,
  ] = useActionState(insertContact, {
    ok: false,
    error: '',
    errors: {
      name: null,
      email: null,
      reason: null,
    },
    formData: new FormData(),
  });
  return (
    <form action={formAction}>
      <div className="field">
        <label htmlFor="name">Your name</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={(formData.get('name') ?? '') as string}
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby="name-error"
        />
        <FieldError
          serverError={errors.name}
          errorId="name-error"
        />
      </div>
      <div className="field">
        <label htmlFor="email">Your email address</label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={(formData.get('email') ?? '') as string}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby="email-error"
        />
        <FieldError
          serverError={errors.email}
          errorId="email-error"
        />
      </div>
      <div className="field">
        <label htmlFor="reason">Reason you need to contact us</label>
        <select
          id="reason"
          name="reason"
          defaultValue={(formData.get('reason') ?? '') as string}
          aria-invalid={errors.reason ? 'true' : 'false'}
          aria-describedby="reason-error"
        >
           <option value=""></option>
           <option value="Support">Support</option>
           <option value="Feedback">Feedback</option>
           <option value="Other">Other</option>
         </select>
        <FieldError
          serverError={errors.reason}
          errorId="reason-error"
        />
      </div>
       <div className="field">
         <label htmlFor="notes">Additional notes</label>
         <textarea
          id="notes"
          name="notes"
          defaultValue={(formData.get('notes') ?? '') as string}
        ></textarea>
       </div>
       {!ok && <p role="alert" className="error">{error}</p>}
       <button type="submit">Submit</button>
     </form>
   );
 }

type Err = { message?: string } | null;
function FieldError({ serverError, errorId }: {
  serverError: Err;
  errorId: string;
}) {
  if (!serverError) {
    return null;
  }
  return (
    <div id={errorId} role="alert">
      {serverError.message}
    </div>
  );
}

import EventForm from '../components/EventForm';
import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect,
} from "react-router-dom";
function NewEventPage() {
  return <EventForm  />;
}

export default NewEventPage;


//fucntion will be triggered whenever the form in AuthForm component is submited!
export async function action({ request }) {

  const data = await request.formData();
  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };
  
  let url = 'http://localhost:8080/events';
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (response.status == 422 || response.status == 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not save event.' }, { status: 500 });
  }


  return redirect("/");
}

import RegisterForm from "../../components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#fff] flex flex-col items-center pt-[120px] pb-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col">
        <h1 className="font-heading text-h3 text-primary mb-6 text-center">
          Register
        </h1>
        <RegisterForm />
      </div>
    </div>
  );
}
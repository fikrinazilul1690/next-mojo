import RegisterForm from './components/RegisterForm';

export default function Register() {
  return (
    <main className='flex justify-center items-center my-[50px]'>
      <div className='lg:w-[700px] rounded-lg border border-solid border-[#D9D9D9]'>
        <div className='mx-[97px] my-[93px]'>
          <h1 className='text-2xl font-bold mt-[93px] text-center mb-7'>
            Daftar Akun
          </h1>
          <RegisterForm className='flex flex-col justify-between gap-7' />
        </div>
      </div>
    </main>
  );
}

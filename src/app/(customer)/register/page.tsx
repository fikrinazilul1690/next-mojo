export default function Register() {
  return (
    <main className='flex justify-center items-center my-[50px]'>
      <div className='lg:w-[700px] rounded-lg border border-solid border-[#D9D9D9]'>
        <form action='' method='post' className='mx-[97px] my-[93px]'>
          <h1 className='text-2xl font-bold mt-[93px] text-center mb-7'>
            Daftar Akun
          </h1>
          <div className='flex flex-col justify-between gap-7'>
            <div className='flex flex-col justify-start'>
              <label htmlFor='name' className='text-md font-semibold'>
                Nama Lengkap
              </label>
              <input
                name='name'
                id='name'
                type='text'
                placeholder='Full Name'
                className='w-full h-14 rounded-md border border-slate-100 px-8 py-4 text-base'
              />
            </div>
            <div className='flex flex-col justify-start'>
              <label htmlFor='email' className='text-md font-semibold'>
                E-mail
              </label>
              <input
                name='email'
                id='email'
                type='text'
                placeholder='example@email.com'
                className='w-full h-14 rounded-md border border-slate-100 px-8 py-4 text-base'
              />
            </div>
            <div className='flex flex-col justify-start'>
              <label htmlFor='phone' className='text-md font-semibold'>
                Nomor Handphone
              </label>
              <input
                name='phone'
                id='phone'
                type='text'
                placeholder='e.g. 089999999999'
                className='w-full h-14 rounded-md border border-slate-100 px-8 py-4 text-base'
              />
            </div>
            <div className='flex flex-col justify-start'>
              <label htmlFor='password' className='text-md font-semibold'>
                Kata Sandi
              </label>
              <input
                name='password'
                id='password'
                type='password'
                placeholder='Password'
                className='w-full h-14 rounded-md border border-slate-100 px-8 py-4 text-base'
              />
            </div>
            <div className='flex flex-col justify-start'>
              <label
                htmlFor='confirm_password'
                className='text-md font-semibold'
              >
                Konfirmasi Kata Sandi
              </label>
              <input
                name='confirm_password'
                id='confirm_password'
                type='password'
                placeholder='Confirm Password'
                className='w-full h-14 rounded-md border border-slate-100 px-8 py-4 text-base'
              />
            </div>
            <button
              type='submit'
              className='py-5 px-14 rounded-lg self-center text-white bg-black'
            >
              Daftar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

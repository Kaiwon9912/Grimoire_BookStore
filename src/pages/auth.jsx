import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
    const [fullName, setFullName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  const pages = [
    { title: 'Grimoire', content: 'Trang bìa', isCover: true },
    { title: 'Đăng ký', content: 'Đây là ứng dụng giúp bạn khám phá tri thức.' },
    { title: 'Đăng nhập', content: 'Hãy đăng nhập hoặc đăng ký tài khoản.' },
   
  ];

  useEffect(() => {
    const timer = setTimeout(() => setCurrentPage(1), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert('Check your email for confirmation!');
  };

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else alert('Đăng nhập thành công!');
  };

  return (
    <div className='relative h-screen w-screen bg-cover bg-center bg-[url(https://www.wallpapergap.com/cdn/24/176/aesthetic-book-wallpaper-1920x1200.jpg)]'>
      <div className='h-full flex items-center justify-center overflow-hidden'>
        <div className='relative w-[450px] h-[600px] [perspective:2000px]'>
          {pages.map((page, index) => {
            const flipped = index < currentPage;
            const isCurrent = index === currentPage;
            return (
              <div
                key={index}
                className={`absolute w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
                  flipped ? '[transform:rotateY(-180deg)] -translate-x-[450px]' : '[transform:rotateY(0deg)]'
                }`}
                style={{
                  transformOrigin: 'left',
                  zIndex: pages.length - index,
                }}
              >
                {/* Mặt trước */}
                <div
                  className={`absolute w-full  h-full rounded-lg shadow-lg p-8 [backface-visibility:hidden] ${
                    page.isCover ? 'bg-yellow-900 text-white' : 'bg-white'
                  }`}
                >
                  <h2 className='text-3xl font-bangers text-center mb-4'>{page.title}</h2>
                  <p className='text-center'>{page.content}</p>
                 {index === 1 && (
                <div className='mt-6 flex flex-col gap-2'>
                    <input
                    type='text'
                    placeholder='Họ và tên'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className='p-2 rounded-md border'
                    />
                    <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='p-2 rounded-md border'
                    />
                    <input
                    type='password'
                    placeholder='Mật khẩu'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='p-2 rounded-md border'
                    />
                    <input
                    type='password'
                    placeholder='Xác nhận mật khẩu'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className='p-2 rounded-md border'
                    />
                    <div className='flex gap-2 mt-2'>
                    <button
                        onClick={() => {
                        if (password !== confirmPassword) {
                            alert('Mật khẩu không khớp');
                            return;
                        }
                        signUp();
                        }}
                        className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded'
                    >
                        Đăng ký
                    </button>
                    <button
                        onClick={signIn}
                        className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'
                    >
                        Đăng nhập
                    </button>
                    </div>
                </div>
                )}

                  {index === 2 && (
                    <div className='mt-6 flex flex-col gap-2'>
                      <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='p-2 rounded-md border'
                      />
                      <input
                        type='password'
                        placeholder='Mật khẩu'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='p-2 rounded-md border'
                      />
                      <div className='flex gap-2 mt-2'>
                        
                        <button
                          onClick={signIn}
                          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'
                        >
                          Đăng nhập
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Nút điều hướng */}
                  {isCurrent && (
                    <div className='absolute bottom-5 right-5 right-5 flex justify-between'>
                      {index > 1 && (
                        <button
                          onClick={handlePrev}
                          className='font-bangers text-blue-600 hover:text-blue-800'
                        >
                          Quay lại
                        </button>
                      )}
                      {index < pages.length - 1 && index !=0 && (
                        <button
                          onClick={handleNext}
                          className='font-bangers text-blue-600 hover:text-blue-800'
                        >
                          Tiếp tục
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Mặt sau (trống hoặc thêm gì đó nếu cần) */}
                <div className='absolute w-full h-full rounded-lg shadow-lg bg-white text-white p-8 [transform:rotateY(180deg)] [backface-visibility:hidden]'>
                  <h2 className='text-xl font-bold'>Mặt sau của {page.title}</h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

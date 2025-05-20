import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import LabeledInput from '../features/auth/labeInput';
import {ArrowLeft} from 'lucide-react';
import {ArrowRight} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export default function Auth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
    const [fullName, setFullName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const firstName = fullName.trim().split(" ").pop()
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
    const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName, 
      },
    },
  });
    if (error) alert(error.message);
    else  navigate('/verify-email');
  };

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else navigate('/home')
  };

 return (
    <div className='relative h-screen w-screen bg-cover bg-center bg-[url(https://www.wallpapergap.com/cdn/24/176/aesthetic-book-wallpaper-1920x1200.jpg)]'>
      <div className='absolute inset-0 bg-black opacity-50'></div>

     
      <div className='h-full flex items-center justify-center overflow-hidden'>
        <div className='relative w-[450px] h-[600px] translate-x-[225px] [perspective:2000px]'>
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
                  className={`absolute w-full   h-full rounded-lg shadow-lg p-8 [backface-visibility:hidden] ${
                    page.isCover ? ' bg-no-repeat bg-cover bg-[url(/src/assets/cover.png)] text-white' : 'bg-cover bg-[url(https://media.istockphoto.com/id/1299389385/photo/vintage-white-paper-texture.jpg?s=612x612&w=0&k=20&c=S85UZFYGC8iYqFBnB2G5dJjuTUdFNujuDNcCKlbLExo=)]'
                  }`}
                >
                  {index === 0 && (
                    <div className='flex flex-col items-center justify-center h-full'>

                      <img className='opacity-80' src='https://static.vecteezy.com/system/resources/thumbnails/036/626/964/small_2x/ai-generated-gold-star-on-transparent-background-png.png'/>
                    </div>
          
                    )}

                 {index === 1 && (
                  
                <div className='mt-6 flex flex-col gap-2'>
                 <h2 className='text-3xl font-greatvb text-center mt-10 mb-4'>{page.title}</h2>
                  <p className='text-center pb-5'>{page.content}</p>
                  <LabeledInput
                    label='Họ và tên'
                    name='fullName'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder='Nhập họ tên'
                  />
                  <LabeledInput
                    label='Email'
                    type='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Nhập email'
                  />
                  <LabeledInput
                    label='Mật khẩu'
                    type='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Nhập mật khẩu'
                  />
                  <LabeledInput
                    label='Xác nhận mật khẩu'
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder='Nhập lại mật khẩu'
                  />
                 
                    <button
                        onClick={() => {
                        if (password !== confirmPassword) {
                            alert('Mật khẩu không khớp');
                            return;
                        }
                        signUp();
                        }}
                        className='absolute bottom-5 w-20 h-20 right-5  rounded-full hover:bg-red-500 text-yellow-900 shadow-lg -skew-y-6 border-yellow-900 border-2 font-bangers hover:text-white '
                    >
                        Đăng ký
                    </button>
                    <div className='absolute bottom-32 right-6 text-center'>
                       
                      <div className='absolute -top-8 right-5 text-2xl text-gray-500 font-allura    border-yellow-900'>
                        {
                         
                           firstName 
                        }
                        {firstName.length > 0 && (
                             <div className='w-full  bottom-1 rounded-l-lg -right-3 absolute border-b-2 border-r-2 border-yellow-900 h-4 rounded-r-xl px-2'>
                               </div>
                         )}
              

                    
                      </div>
                      <p>
                        {fullName}
                      </p>
                    </div>
                </div>
                )}

                  {index === 2 && (
                    
                    <div className='mt-6 flex flex-col gap-2'>
                  <h2 className='text-3xl font-greatvb text-center mt-10 mb-4'>{page.title}</h2>
                  <p className='text-center pb-4'>{page.content}</p>
                      <LabeledInput
                      label={'Email'}
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='p-2 rounded-md border'
                      />
                      <LabeledInput
                        label={'Mật khẩu'}
                        type='password'
                        placeholder='Mật khẩu'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='p-2 rounded-md border'
                      />
                      <div className='flex gap-2 mt-2'>
                        
                        <button
                          onClick={signIn}
                          className='absolute bottom-5 w-20 h-20 right-5  rounded-full hover:bg-emerald-500 text-yellow-900 shadow-lg -skew-y-6 border-yellow-900 border-2 font-bangers hover:text-white '
                        >
                          Đăng nhập
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Nút điều hướng */}
                  {isCurrent && (
                    <div className='absolute top-5 right-5 flex justify-between'>
                      {index > 1 && (
                        <button
                          onClick={handlePrev}
                          className='font-bangers  hover:text-blue-700'
                        >
                          <ArrowLeft className='inline-block mr-1' />
                          Đăng ký
                        </button>
                      )}
                      {index < pages.length - 1 && index !=0 && (
                        <button
                          onClick={handleNext}
                          className='font-bangers   hover:text-green-500'
                        >
                          Đăng nhập
                          <ArrowRight className='inline-block ml-1' />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Mặt sau (trống hoặc thêm gì đó nếu cần) */}
                <div className='absolute w-full  h-full rounded-lg shadow-lg bg-[url(https://media.istockphoto.com/id/1299389385/photo/vintage-white-paper-texture.jpg?s=612x612&w=0&k=20&c=S85UZFYGC8iYqFBnB2G5dJjuTUdFNujuDNcCKlbLExo=)] text-white p-8 [transform:rotateY(180deg)] [backface-visibility:hidden]'>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

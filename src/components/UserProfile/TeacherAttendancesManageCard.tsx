/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAccessToken, selectLoggedInUser } from "../../stores/user";
import { fetchAllStreamsByTeacher, fetchAllTimeTablesForTeacher } from "../../service";
import { onErrorToast } from "../../util";

type ComponentProps = { 
  onLessonChange: any, 
  onExport: any,
  isLesson: boolean,
  onStreamChange: any
}

export default function TeacherAttendancesManageCard({ onLessonChange, onExport, isLesson, onStreamChange } : ComponentProps ) {
  const bearerToken = useSelector(selectAccessToken) as string;
  const { id } = useSelector(selectLoggedInUser);
  const [lessons, setLessonsData] = useState<any[]>([]);
  const [streams, setStreamsData] = useState<any[]>([]);

  const onLoadPageData = async () => {
    const lessons = await fetchAllTimeTablesForTeacher(bearerToken, String(id));
    if(lessons.success){
        setLessonsData(lessons.data.data);
    }else{
        onErrorToast(lessons.message);
    }

    const streams = await fetchAllStreamsByTeacher(bearerToken, String(id));
    if(streams.success){
        setStreamsData(streams.data.data);
    }else{
        onErrorToast(streams.message);
    }
  }

  const handleLessonChange = (evt: any) => {
    if(!evt) return;
    const lesson_id = evt.target.value;
    const selectedLesson = lessons.find( l => String(l.id) === lesson_id);
    onLessonChange(selectedLesson);
  }

  const handleStreamChange = (evt: any) => {
    if(!evt) return;
    const stream_id = evt.target.value;
    const selectedStream = streams.find( l => String(l.id) === stream_id);
    onStreamChange(selectedStream);
  }

  useEffect(() => {
    async function LoadDefaults(){
      await onLoadPageData();
    }
    LoadDefaults();
  }, [])

  return (
    <>
      <div className="p-5 lg:p-6">
        <div className="flex flex-col gap-1 xl:flex-row">
           {/* select form */}
           { isLesson ? (
             <form className="inline-flex items-center gap-3 ">
              <label className="text-sm font-medium text-gray-700">
                Choose lesson
              </label>
              <div className="relative">
                <select
                  onChange={handleLessonChange}
                  id="lesson-select" 
                  name="lesson" 
                  className="block w-full pl-3 pr-10 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
                >
                  <option value="">Select a lesson</option>
                  { lessons?.map( l => (<option value={l.id}> { l.date } : { l.time } : { l.stream_name } - { l.lesson_name }</option>))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </form>
           ) : (
              <form className="inline-flex items-center gap-3 ">
                <label className="text-sm font-medium text-gray-700">
                  Choose stream
                </label>
                <div className="relative">
                  <select
                    onChange={handleStreamChange}
                    id="lesson-select" 
                    name="stream" 
                    className="block w-full pl-3 pr-10 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
                  >
                    <option value="">Select a stream</option>
                    { streams?.map( l => (<option value={l.id}> { l.name } : { l.flabel } - { l.tlabel }</option>))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </form>
           )}
        
           {/* end */}
         
          { !isLesson && (
            <button
            onClick={onExport}
            className="flex w-full items-center text-gray-brand px-2 py-2 justify-center gap-2 lg:w-64"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              width="2em"
              height="2em"
            >
              <path
                fill="currentColor"
                d="M94.284 65.553L75.825 52.411a1.25 1.25 0 0 0-1.312-.093c-.424.218-.684.694-.685 1.173l.009 6.221H57.231c-.706 0-1.391.497-1.391 1.204v11.442c0 .707.685 1.194 1.391 1.194h16.774v6.27c0 .478.184.917.609 1.136s.853.182 1.242-.097l18.432-13.228c.335-.239.477-.626.477-1.038v-.002c0-.414-.144-.8-.481-1.04"
              ></path>
              <path
                fill="currentColor"
                d="M64.06 78.553h-6.49a1.73 1.73 0 0 0-1.73 1.73h-.007v3.01H15.191V36.16h17.723a1.73 1.73 0 0 0 1.73-1.73V16.707h21.188v36.356h.011a1.73 1.73 0 0 0 1.726 1.691h6.49c.943 0 1.705-.754 1.726-1.691h.004V12.5h-.005V8.48a1.73 1.73 0 0 0-1.73-1.73h-32.87L5.235 32.7v58.819c0 .956.774 1.73 1.73 1.73h57.089a1.73 1.73 0 0 0 1.73-1.73v-2.448h.005v-8.79a1.73 1.73 0 0 0-1.729-1.728"
              ></path>
              <path
                fill="currentColor"
                d="M26.18 64.173c.831 0 1.55.623 1.786 1.342l2.408-1.121c-.553-1.273-1.771-2.685-4.193-2.685c-2.893 0-5.079 1.924-5.079 4.775c0 2.837 2.187 4.774 5.079 4.774c2.422 0 3.654-1.467 4.193-2.699l-2.408-1.107c-.235.719-.955 1.342-1.786 1.342c-1.342 0-2.242-1.024-2.242-2.311s.899-2.31 2.242-2.31m9.476 4.734a4.3 4.3 0 0 1-2.976-1.19l-1.453 2.076c.982.886 2.325 1.467 4.291 1.467c2.477 0 3.986-1.176 3.986-3.211c0-3.432-5.135-2.685-5.135-3.557c0-.235.152-.415.706-.415c.872 0 1.91.304 2.712.913l1.495-1.979c-1.052-.858-2.408-1.287-3.917-1.287c-2.533 0-3.833 1.495-3.833 3.059c0 3.64 5.148 2.74 5.148 3.626c0 .359-.498.498-1.024.498m7.615-7.045h-3.169l3.404 9.231h3.516l3.404-9.231h-3.169l-1.993 6.214z"
              ></path>
            </svg>
            Export
          </button>
          )}
        </div>
      </div>
    </>
  );
}

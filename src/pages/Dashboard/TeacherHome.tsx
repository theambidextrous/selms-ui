/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput, DateSelectArg, EventClickArg } from "@fullcalendar/core";
import { Modal } from "../../components/ui/modal";
import { useModal } from "../../hooks/useModal";
import PageMeta from "../../components/common/PageMeta";
import { fetchAllSubjects, fetchAllStreams, fetchAllTimeTables, addNewTimeTable, editTimeTable } from "../../service";
import { onErrorToast, LessonMarkers, LessonDays, onSuccessToast } from "../../util";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../stores/user";
import { Formik } from "formik";
import * as Yup from 'yup';
import Label from "../../components/form/Label";
import { TeacherObject } from "../Teachers";

interface extendedProps {
  calendar: string;
};

export interface TimeTableObject extends EventInput {
  id?: any,
  current_term?: string,
  day: string,
  date: string,
  time: string,
  stream: string,
  subject: string,
  teacher: string,
  datetime?: string,
  created_at?: string,
  updated_at?: string,
  color: string,
  title?: string,
  start?: string,
  end?: string,
  extendedProps?: extendedProps,
  duration: string,
  lesson_duration?: number,
  lesson_date?: string,
  teacher_meta?: TeacherObject,
  stream_name?: string
}

const eventFormDefaults = {
  subject: '',
  teacher: '',
  stream: '',
  day: '',
  date: new Date().toISOString().split('T')[0],
  color: 'warning',
  time: '',
  duration: 0
} as any as TimeTableObject;

export const TeacherHome: React.FC = () => {
  const bearerToken = useSelector(selectAccessToken) as string;
  const [subjects, setSubjectsData] = useState<any[]>();
  const [streams, setStreamsData] = useState<any[]>();
  const [data, setData] = useState<TimeTableObject[]>();
  
  const [selectedEvent, setSelectedEvent] = useState<TimeTableObject | null>(null);
  const [formDefaults, setFormDefaults] = useState<TimeTableObject>(eventFormDefaults);
  const [eventLevel] = useState("");
  const calendarRef = useRef<FullCalendar>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const loadGridData = async () => {
    const timetables = await fetchAllTimeTables(bearerToken);
    if(timetables.success){
      setData(timetables.data.data)
    }else{
      onErrorToast(timetables.message);
    }
  }
  const onLoadPageData = async () => {
      await loadGridData();
      const subjects = await fetchAllSubjects(bearerToken);
      if(subjects.success){
          setSubjectsData(subjects.data.data);
      }else{
          onErrorToast(subjects.message);
      }

      const streams = await fetchAllStreams(bearerToken);
      if(streams.success){
          setStreamsData(streams.data.data);
      }else{
          onErrorToast(streams.message);
      }
  }

  useEffect(() => {
      async function LoadDefaults(){
      await onLoadPageData();
      }
      LoadDefaults();
  }, [])

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    resetModalFields();
    const { startStr } = selectInfo;
    const defaults = {...formDefaults, date: new Date(startStr).toISOString().split('T')[0]}
    setFormDefaults(defaults as any as TimeTableObject)
    openModal();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const { event } = clickInfo;
    if(event){
      const { extendedProps, id } = event;
      const eventData = { 
        ...extendedProps, 
        duration: extendedProps.lesson_duration, 
        date: new Date(extendedProps.lesson_date).toISOString().split('T')[0],
        color: extendedProps.calendar,
        id
      } as any as TimeTableObject;
      setSelectedEvent(eventData);
      openModal();
    }
  };

  const onCreateTimeTable = async (values : TimeTableObject) => {
    const resp = await addNewTimeTable(bearerToken, values);
    if(resp.success){
      closeModal();
      resetModalFields();
      await loadGridData();
      setTimeout(() => {
        onSuccessToast('Added created successfully!');
      }, 300);
    }else{
      onErrorToast(resp.message);
    }
  }

  const onEditTimeTble = async (id: any, values : any) => {
    const resp = await editTimeTable(id, bearerToken, values);
    if(resp.success){
      closeModal();
      resetModalFields();
      await loadGridData();
      setTimeout(() => {
        onSuccessToast('Updated successfully!');
      }, 500);
    }else{
      onErrorToast(resp.message);
    }
  }

  const handleAddOrUpdateEvent = async (values: any) => {
    if(selectedEvent){
      await onEditTimeTble(selectedEvent.id, values);
    }else{
      await onCreateTimeTable(values);
    }
  };

  const resetModalFields = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      <PageMeta
         title="School LMS - SELMS"
        description="School LMS - SELMS"
      />
      <div className="rounded-2xl border  border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="custom-calendar">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next addEventButton",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={data}
            selectable={true}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            customButtons={{
              addEventButton: {
                text: "Add a Lesson +",
                click: openModal,
              },
            }}
          />
        </div>
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-[800px] p-6 lg:p-12"
        >
            <Formik
                initialValues={selectedEvent ? selectedEvent : formDefaults}
                validationSchema={CreateTeacherLessonSchema}
                onSubmit={handleAddOrUpdateEvent}
                >
                {({ errors, touched, handleSubmit, handleChange, setFieldValue, values }) => (
                    <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
                      <div>
                        <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
                            {selectedEvent ? "Edit Selected Lesson" : "Add New Lesson"}
                        </h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Use this calendar view to manage your class lessons. You can toggle month, day or week view
                        </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="py-4">
                            <div>
                                <Label>Subject</Label>
                                <select value={values.subject} onChange={handleChange('subject')} className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30">
                                    <option value={''}>Select option</option>
                                    { subjects?.map((f:any) => (<option value={f.id}>{ f.name }</option>)) }
                                </select>
                                {errors.subject && touched.subject ? (
                                <div className='text-error-400'>{errors.subject}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="py-4">
                            <div>
                                <Label>Class/Stream</Label>
                                <select value={values.stream} onChange={handleChange('stream')} className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30">
                                    <option value={''}>Select option</option>
                                    { streams?.map((f:any) => (<option value={f.id}>{ f.name }</option>)) }
                                </select>
                                {errors.stream && touched.stream ? (
                                <div className='text-error-400'>{errors.stream}</div>
                                ) : null}
                            </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="py-4">
                          <div>
                              <Label>Day</Label>
                              <select value={values.day} onChange={handleChange('day')} 
                                className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30">
                                  <option value={''}>Select option</option>
                                  { Object.entries(LessonDays).map(([key, value]) => (<option value={key}>{ value }</option>)) }
                              </select>
                              {errors.day && touched.day ? (
                              <div className='text-error-400'>{errors.day}</div>
                              ) : null}
                          </div>
                        </div>
                        <div className="py-4">
                          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Date
                          </label>
                          <div className="relative">
                            <input
                                id="event-start-date"
                                type="date"
                                value={values.date ? values.date.toString(): new Date().toString()}
                                onChange={handleChange('date')}
                                className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            />
                            {errors.date && touched.date ? (
                              <div className='text-error-400'>{ errors.date as string }</div>
                              ) : null}
                          </div>
                        </div>
                        <div className="py-4">
                          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Time
                          </label>
                          <div className="relative">
                            <input
                                id="event-start-time"
                                type="time"
                                value={values.time}
                                onChange={handleChange('time')}
                                className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            />
                            {errors.time && touched.time ? (
                              <div className='text-error-400'>{ errors.time as string }</div>
                              ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                        <div className="py-4">
                          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                            Duration in Minutes
                          </label>
                          <div className="relative">
                            <input
                                id="event-start-time"
                                type="number"
                                value={values.duration}
                                onChange={handleChange('duration')}
                                className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            />
                            {errors.duration && touched.duration ? (
                              <div className='text-error-400'>{ errors.duration as string }</div>
                              ) : null}
                          </div>
                        </div>
                        <div className="py-4">
                          <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
                          Lesson Highlight
                          </label>
                          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                          {Object.entries(LessonMarkers).map(([key, value]) => (
                              <div key={key} className="n-chk">
                              <div
                                  className={`form-check form-check-${value} form-check-inline`}
                              >
                                  <label
                                  className="flex items-center text-sm text-gray-700 form-check-label dark:text-gray-400"
                                  htmlFor={`modal${key}`}
                                  >
                                  <span className="relative">
                                      <input
                                      className="sr-only form-check-input"
                                      type="radio"
                                      name="event-level"
                                      value={key}
                                      id={`modal${key}`}
                                      checked={values.color === value}
                                      onChange={() => setFieldValue('color', value)}
                                      />
                                      <span className="flex items-center justify-center w-5 h-5 mr-2 border border-gray-300 rounded-full box dark:border-gray-700">
                                      <span
                                          className={`h-2 w-2 rounded-full bg-white ${
                                          eventLevel === key ? "block" : "hidden"
                                          }`}
                                      ></span>
                                      </span>
                                  </span>
                                  {key}
                                  </label>
                                  {errors.color && touched.color ? (
                                    <div className='text-error-400'>{ errors.color }</div>
                                    ) : null}
                              </div>
                              </div>
                          ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
                        <button
                            onClick={closeModal}
                            type="button"
                            className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
                        >
                            Close
                        </button>
                        <button
                            onClick={() => handleSubmit()}
                            type="button"
                            className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
                        >
                            {selectedEvent ? "Update Changes" : "Add"}
                        </button>
                      </div>
                    </div>
                )}
            </Formik>
        </Modal>
      </div>
    </>
  );
};

const renderEventContent = (eventInfo: any) => {
  const { extendedProps, start, end } = eventInfo.event;
  const { teacher_meta } = extendedProps;
  const colorClass = `fc-bg-${extendedProps.calendar.toLowerCase()}`;
  const startTime = new Date(start).toISOString().split("T")[1];
  const endTime = new Date(end).toISOString().split("T")[1];
  return (
    <div
      className={`event-fc-color flex fc-event-main ${colorClass} p-1 rounded-sm`}
    >
      <div className="fc-daygrid-event-dot"></div>
      <div className="fc-event-time text-gray-600">{extendedProps.time}</div>
      <div className="fc-event-title">
        <p>{eventInfo.event.title}({teacher_meta.fname})</p>
        <p>Time: {startTime.slice(0, 5)} - {endTime.slice(0, 5)}</p>
        <p>Class: {extendedProps.stream_name}</p>
      </div>
    </div>
  );
};

export const CreateTeacherLessonSchema = Yup.object().shape({
  subject: Yup.string().max(5, 'Too Long!').required('Required field'),
  teacher: Yup.string().max(5, 'Too Long!').required('Required field'),
  stream: Yup.string().max(5, 'Too Long!').required('Required field'),
  day: Yup.string().max(15, 'Too Long!').required('Required field'),
  date: Yup.date().required('Required field'),
  color: Yup.string().max(15, 'Too Long!').required('Required field'),
  time: Yup.string().max(12, 'Too Long!').required('Required field'),
  duration: Yup.number().min(15, 'Too Brief!').max(120, 'Too Long!').required('Required field')
});

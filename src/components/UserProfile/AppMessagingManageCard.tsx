import { AppMessagingObject } from "../../pages/Performance/AppMessaging";

export default function AppMessagingManageCard({ selection, onExport, onRefresh } : 
    { selection: AppMessagingObject, onExport: any, onRefresh: any}) {

  const onApproveMessage = async () => {}

  return (
    <>
      <div className="p-5 lg:p-6">
        <div className="flex flex-col gap-1 xl:flex-row">
          { selection && (
            <button
              onClick={onApproveMessage}
              className="flex w-full items-center text-white bg-brand-500 rounded-full px-2 py-2 justify-center gap-2 lg:w-48"
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="2em"
              height="2em"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="square"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h1m4-6a3 3 0 1 1-6 0a3 3 0 0 1 6 0Zm7.441 1.559a1.907 1.907 0 0 1 0 2.698l-6.069 6.069L10 19l.674-3.372l6.07-6.07a1.907 1.907 0 0 1 2.697 0Z"
              ></path>
            </svg>
              Approve Selected
            </button>
          )}
          <button
            onClick={onRefresh}
            className="flex w-full items-center text-gray-600 bg-gray-300 rounded-full px-2 py-2 justify-center gap-2 lg:w-48"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="2em"
              height="2em"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
              >
                <path
                  strokeMiterlimit="10"
                  d="M18.024 16.957A8.373 8.373 0 0 1 3.74 11.045"
                ></path>
                <path
                  strokeLinejoin="round"
                  d="m17.35 21.25l.832-3.372a1.123 1.123 0 0 0-.854-1.382l-3.372-.843"
                ></path>
                <path
                  strokeMiterlimit="10"
                  d="M5.976 7.043a8.373 8.373 0 0 1 14.285 5.912"
                ></path>
                <path
                  strokeLinejoin="round"
                  d="m6.65 2.75l-.832 3.372a1.124 1.124 0 0 0 .855 1.382l3.371.843"
                ></path>
              </g>
            </svg>
            Refresh
          </button>
          <button
            onClick={onExport}
            className="flex w-full items-center text-gray-600 bg-gray-300 rounded-full px-2 py-2 justify-center gap-2 lg:w-64"
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
        </div>
      </div>
    </>
  );
}

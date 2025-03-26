import { create } from 'zustand'

const useconversation = create((set) => ({
  selectedconversation: null,
  setselectedconversation: (selectedconversation) =>{
    console.log(" Setting selectedconversation:", selectedconversation);
     set({selectedconversation});
  },
  messages:[],
  setmessages:(messages)=> set({messages})
}));
export default useconversation;

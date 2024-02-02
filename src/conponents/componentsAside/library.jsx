import endpoint from '../../config';
import axios from 'axios';


export const getMonthName= (monthNumber) => {
    const months = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];
  
    // Ensure the monthNumber is within a valid range (1-12)
    if (monthNumber >= 1 && monthNumber <= 12) {
      return months[monthNumber - 1]; // Months array is 0-based
    } else {
      // return 'Invalid Month';
      return months[12]; // Months array is 12 -based
    }
  }
  
  export const getDateDayOfWeek = (dateString) => {
    // Create a Date object with the input date string in the format YYYY/mm/dd
    const date = new Date(dateString);
  
    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeek = date.getDay();
    // Return the day of the week (Sunday, Monday, etc.)
    // const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //overide
    const daysOfWeek = ['1', '2', '3', '4', '5', '6', '7'];
    return daysOfWeek[dayOfWeek];
    // console.log('dayOfWeek',dayOfWeek);
  };
  
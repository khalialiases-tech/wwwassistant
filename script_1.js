let currentDate = new Date();

const monthNames = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

const monthNamesEn = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Update header
    document.getElementById('monthYear').textContent = `${monthNames[month]} ${year}`;
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    // Clear calendar
    const calendarDiv = document.getElementById('calendar');
    calendarDiv.innerHTML = '';
    
    // Add days from previous month
    for (let i = firstDay - 1; i >= 0; i--) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day other-month';
        dayDiv.textContent = daysInPrevMonth - i;
        calendarDiv.appendChild(dayDiv);
    }
    
    // Add days of current month
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        dayDiv.textContent = day;
        
        // Check if it's today
        if (year === today.getFullYear() && 
            month === today.getMonth() && 
            day === today.getDate()) {
            dayDiv.classList.add('today');
        }
        
        // Add click event
        dayDiv.addEventListener('click', () => {
            document.querySelectorAll('.day.selected').forEach(d => d.classList.remove('selected'));
            dayDiv.classList.add('selected');
        });
        
        calendarDiv.appendChild(dayDiv);
    }
    
    // Add days from next month
    const totalCells = calendarDiv.children.length;
    const remainingCells = 42 - totalCells; // 6 weeks * 7 days
    for (let day = 1; day <= remainingCells; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day other-month';
        dayDiv.textContent = day;
        calendarDiv.appendChild(dayDiv);
    }
}

// Event listeners
document.getElementById('prevBtn').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

document.getElementById('nextBtn').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Initial render
renderCalendar();


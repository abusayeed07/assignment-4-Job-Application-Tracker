// Get all the elements we need from the page
const totalDisplay = document.getElementById('total-count');
const interviewDisplay = document.getElementById('interview-count');
const rejectedDisplay = document.getElementById('rejected-count');
const jobCountDisplay = document.getElementById('section-job-count');

const allTab = document.getElementById('tab-all');
const interviewTab = document.getElementById('tab-interview');
const rejectedTab = document.getElementById('tab-rejected');

let currentTab = 'all';

function updateNumbers() {
    // Get all jobs
    const allJobs = document.querySelectorAll('.job-card');
    const totalJobs = allJobs.length;
    const interviewJobs = document.querySelectorAll('.job-card[data-status="INTERVIEW"]').length;
    const rejectedJobs = document.querySelectorAll('.job-card[data-status="REJECTED"]').length;
    
    // Update the top boxes
    totalDisplay.innerText = totalJobs;
    interviewDisplay.innerText = interviewJobs;
    rejectedDisplay.innerText = rejectedJobs;
    
    // Count how many jobs are visible right now
    let visibleCount = 0;
    for (let job of allJobs) {
        const styles = window.getComputedStyle(job);
        if (styles.display !== 'none') {
            visibleCount++;
        }
    }
    
    if (visibleCount === 1) {
        jobCountDisplay.innerText = '1 job';
    } else {
        jobCountDisplay.innerText = visibleCount + ' jobs';
    }
}

function showJobs(tabName) {
    // Get all job cards
    const allJobs = document.querySelectorAll('.job-card');
    
    // Loop through each job one by one
    for (let job of allJobs) {
        // Get this job's status (INTERVIEW, REJECTED, or NOT APPLIED)
        const status = job.dataset.status;
    
        if (tabName === 'all') {
            // Show ALL jobs
            job.style.display = 'block';
        }
        else if (tabName === 'interview') {
            // Show ONLY interview jobs
            if (status === 'INTERVIEW') {
                job.style.display = 'block';
            } else {
                job.style.display = 'none';
            }
        }
        else if (tabName === 'rejected') {
            // Show ONLY rejected jobs
            if (status === 'REJECTED') {
                job.style.display = 'block';
            } else {
                job.style.display = 'none';
            }
        }
    }
    
    // Check if there are any visible jobs
    let anyVisible = false;
    for (let job of allJobs) {
        const styles = window.getComputedStyle(job);
        if (styles.display !== 'none') {
            anyVisible = true;
            break;
        }
    }
    
    // Show "No jobs" message if nothing is visible
    const container = document.getElementById('jobs-container');
    const oldMessage = document.getElementById('empty-message');
    
    if (anyVisible === false) {
        // Remove old message if it exists
        if (oldMessage) {
            oldMessage.remove();
        }
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.id = 'empty-message';
        messageDiv.className = 'text-center py-16 bg-white rounded-xl border border-gray-200';
        messageDiv.innerHTML = `
            <p class="text-4xl text-gray-400 mb-4">📭</p>
            <h3 class="text-xl font-semibold text-gray-700">No jobs available</h3>
            <p class="text-gray-500 mt-2">No "${tabName}" jobs found</p>
        `;
        container.appendChild(messageDiv);
    } else {
        // Remove message if jobs exist
        if (oldMessage) {
            oldMessage.remove();
        }
    }
    
    // Update all numbers
    updateNumbers();
}

function changeStatus(jobCard, newStatus) {
    // Update the status in the data attribute
    jobCard.dataset.status = newStatus;
    
    // Find and update the badge text
    const badge = jobCard.querySelector('.status-badge');
    if (badge) {
        badge.innerText = newStatus;
        
        // Change badge color based on status
        if (newStatus === 'INTERVIEW') {
            badge.className = 'bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded border border-green-300 status-badge';
        } 
        else if (newStatus === 'REJECTED') {
            badge.className = 'bg-red-100 text-red-700 text-xs font-semibold px-3 py-1.5 rounded border border-red-300 status-badge';
        }
        else if (newStatus === 'NOT APPLIED') {
            badge.className = 'bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded border border-gray-300 status-badge';
        }
    }
    
    // Refresh the current tab
    showJobs(currentTab);
}

const jobsContainer = document.getElementById('jobs-container');

jobsContainer.addEventListener('click', function(event) {
    // Find which job card was clicked
    const jobCard = event.target.closest('.job-card');
    
    // If click wasn't on a job card, do nothing
    if (!jobCard) {
        return;
    }
    
    // Check if INTERVIEW button was clicked
    if (event.target.classList.contains('interview-btn')) {
        changeStatus(jobCard, 'INTERVIEW');
    }
    
    // Check if REJECTED button was clicked
    if (event.target.classList.contains('rejected-btn')) {
        changeStatus(jobCard, 'REJECTED');
    }
    
    // Check if DELETE button was clicked
    if (event.target.closest('.delete-btn')) {
        // Ask user to confirm
        const userConfirmed = confirm('Delete this job?');
        
        if (userConfirmed) {
            // Remove the job card
            jobCard.remove();
            // Refresh the current tab
            showJobs(currentTab);
        }
    }
});

// ALL tab clicked
allTab.addEventListener('click', function() {
    // Update which tab is active
    currentTab = 'all';
    
    // Change button colors
    allTab.className = 'px-6 py-2.5 text-sm font-medium rounded-full bg-gray-200 text-gray-800';
    interviewTab.className = 'px-6 py-2.5 text-sm font-medium rounded-full bg-gray-100 text-gray-500';
    rejectedTab.className = 'px-6 py-2.5 text-sm font-medium rounded-full bg-gray-100 text-gray-500';
    
    // Show all jobs
    showJobs('all');
});

// INTERVIEW tab clicked
interviewTab.addEventListener('click', function() {
    // Update which tab is active
    currentTab = 'interview';
    
    // Change button colors
    allTab.className = 'px-6 py-2.5 text-sm font-medium rounded-full bg-gray-100 text-gray-500';
    interviewTab.className = 'px-6 py-2.5 text-sm font-medium rounded-full bg-gray-200 text-gray-800';
    rejectedTab.className = 'px-6 py-2.5 text-sm font-medium rounded-full bg-gray-100 text-gray-500';
    
    // Show only interview jobs
    showJobs('interview');
});

// REJECTED tab clicked
rejectedTab.addEventListener('click', function() {
    // Update which tab is active
    currentTab = 'rejected';
    
    // Change button colors
    allTab.className = 'px-6 py-2.5 text-sm font-medium rounded-full bg-gray-100 text-gray-500';
    interviewTab.className = 'px-6 py-2.5 text-sm font-medium rounded-full bg-gray-100 text-gray-500';
    rejectedTab.className = 'px-6 py-2.5 text-sm font-medium rounded-full bg-gray-200 text-gray-800';
    
    // Show only rejected jobs
    showJobs('rejected');
});

updateNumbers();
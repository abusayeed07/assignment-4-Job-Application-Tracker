// Get all job cards
const jobCards = document.querySelectorAll('.job-card');
const totalSpan = document.getElementById('total-count');
const interviewSpan = document.getElementById('interview-count');
const rejectedSpan = document.getElementById('rejected-count');
const sectionJobCount = document.getElementById('section-job-count');

const tabAll = document.getElementById('tab-all');
const tabInterview = document.getElementById('tab-interview');
const tabRejected = document.getElementById('tab-rejected');

let currentTab = 'all';

// Function to update counts
function updateCounts() {
    const jobs = document.querySelectorAll('.job-card');
    const total = jobs.length;
    const interview = document.querySelectorAll('.job-card[data-status="INTERVIEW"]').length;
    const rejected = document.querySelectorAll('.job-card[data-status="REJECTED"]').length;

    totalSpan.textContent = total;
    interviewSpan.textContent = interview;
    rejectedSpan.textContent = rejected;

    // Update section job count based on current tab
    let visibleJobs = [];

    if (currentTab === 'all') {
        // Get all job cards
        visibleJobs = document.querySelectorAll('.job-card');
    }
    else if (currentTab === 'interview') {
        // Get only interview jobs
        visibleJobs = document.querySelectorAll('.job-card[data-status="INTERVIEW"]');
    }
    else if (currentTab === 'rejected') {
        // Get only rejected jobs
        visibleJobs = document.querySelectorAll('.job-card[data-status="REJECTED"]');
    }

    // Get the number of jobs found
    let numberOfJobs = visibleJobs.length;

    let jobWord = 'jobs';
    if (numberOfJobs === 1) {
        jobWord = 'job';
    }

    // Update the display
    sectionJobCount.textContent = numberOfJobs + ' ' + jobWord;
}

// Function to filter jobs by tab
function filterJobs(tab) {
    const jobs = document.querySelectorAll('.job-card');
    
    jobs.forEach(job => {
        // Get the status of this job (INTERVIEW, REJECTED, or NOT APPLIED)
        const jobStatus = job.dataset.status;
        
        if (tab === 'all') {
            job.style.display = 'block';
        }
        else if (tab === 'interview') {
            if (jobStatus === 'INTERVIEW') {
                job.style.display = 'block';
            } else {
                job.style.display = 'none';
            }
        }
        else if (tab === 'rejected') {
            // Show only REJECTED jobs
            if (jobStatus === 'REJECTED') {
                job.style.display = 'block';  // Show
            } else {
                job.style.display = 'none';    // Hide
            }
        }
    });
    
    // Count how many jobs are visible
    let visibleCount = 0;
    jobs.forEach(job => {
        if (job.style.display !== 'none') {
            visibleCount++;
        }
    });
    
    // Show "No jobs" message if needed
    const container = document.getElementById('jobs-container');
    const oldMessage = document.getElementById('empty-message');
    
    if (visibleCount === 0) {
        // Remove old message if exists
        if (oldMessage) oldMessage.remove();
        
        // Create new message
        const message = document.createElement('div');
        message.id = 'empty-message';
        message.className = 'text-center py-16 bg-white rounded-xl border border-gray-200';
        message.innerHTML = `
            <p class="text-2xl text-gray-400 mb-2">📭</p>
            <h3 class="text-xl font-semibold text-gray-700">No jobs available</h3>
            <p class="text-gray-500 mt-2">No applications with "${tab}" status</p>
        `;
        container.appendChild(message);
    } else {
        // Remove message if jobs exist
        if (oldMessage) oldMessage.remove();
    }
    
    // Update the job count display
    updateCounts();
}

// Function to update job status
function updateJobStatus(card, newStatus) {
    card.dataset.status = newStatus;

    // Update status badge
    const badge = card.querySelector('.status-badge');
    if (badge) {
        badge.textContent = newStatus;
        // Update badge styling
        if (newStatus === 'INTERVIEW') {
            badge.className = 'inline-block bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded border border-green-300 status-badge';
        } else if (newStatus === 'REJECTED') {
            badge.className = 'inline-block bg-red-50 text-red-700 text-xs font-semibold px-3 py-1.5 rounded border border-red-300 status-badge';
        } else if (newStatus === 'NOT APPLIED') {
            badge.className = 'inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded border border-blue-300 status-badge';
        }
    }

    filterJobs(currentTab);
}

// Add event listeners to all interview buttons
document.querySelectorAll('.interview-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const card = document.querySelector(`.job-card[data-id="${id}"]`);
        updateJobStatus(card, 'INTERVIEW');
    });
});

// Add event listeners to all rejected buttons
document.querySelectorAll('.rejected-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const card = document.querySelector(`.job-card[data-id="${id}"]`);
        updateJobStatus(card, 'REJECTED');
    });
});

// Add event listeners to all delete buttons
document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const card = document.querySelector(`.job-card[data-id="${id}"]`);
        card.remove();

        // Check if empty message needs to be shown
        filterJobs(currentTab);
        updateCounts();
    });
});

// Tab click handlers
tabAll.addEventListener('click', () => {
    currentTab = 'all';
    tabAll.className = 'px-6 py-2.5 text-sm font-medium rounded-full bg-gray-200 text-gray-800';
    tabInterview.className = 'px-6 py-2.5 text-sm font-medium rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800';
    tabRejected.className = 'px-6 py-2.5 text-sm font-medium rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800';
    filterJobs('all');
});

tabInterview.addEventListener('click', () => {
    currentTab = 'interview';
    tabAll.className = 'px-6 py-2.5 text-sm font-medium rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800';
    tabInterview.className = 'px-6 py-2.5 text-sm font-medium rounded-full bg-gray-200 text-gray-800';
    tabRejected.className = 'px-6 py-2.5 text-sm font-medium rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800';
    filterJobs('interview');
});

tabRejected.addEventListener('click', () => {
    currentTab = 'rejected';
    tabAll.className = 'px-6 py-2.5 text-sm font-medium rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800';
    tabInterview.className = 'px-6 py-2.5 text-sm font-medium rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800';
    tabRejected.className = 'px-6 py-2.5 text-sm font-medium rounded-full bg-gray-200 text-gray-800';
    filterJobs('rejected');
});

// Initial counts
updateCounts();
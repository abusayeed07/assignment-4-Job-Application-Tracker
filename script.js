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
    if (currentTab === 'all') visibleJobs = document.querySelectorAll('.job-card');
    else if (currentTab === 'interview') visibleJobs = document.querySelectorAll('.job-card[data-status="INTERVIEW"]');
    else if (currentTab === 'rejected') visibleJobs = document.querySelectorAll('.job-card[data-status="REJECTED"]');

    sectionJobCount.textContent = visibleJobs.length + (visibleJobs.length === 1 ? ' job' : ' jobs');
}

// Function to filter jobs by tab
function filterJobs(tab) {
    const jobs = document.querySelectorAll('.job-card');

    jobs.forEach(job => {
        if (tab === 'all') {
            job.style.display = 'block';
        } else if (tab === 'interview') {
            if (job.dataset.status === 'INTERVIEW') {
                job.style.display = 'block';
            } else {
                job.style.display = 'none';
            }
        } else if (tab === 'rejected') {
            if (job.dataset.status === 'REJECTED') {
                job.style.display = 'block';
            } else {
                job.style.display = 'none';
            }
        }
    });

    // Check if no jobs visible in current tab
    const visibleJobs = Array.from(document.querySelectorAll('.job-card')).filter(job =>
        window.getComputedStyle(job).display !== 'none'
    );
    const emptyMessage = document.getElementById('empty-message');

    if (visibleJobs.length === 0) {
        if (!emptyMessage) {
            const container = document.getElementById('jobs-container');
            const msg = document.createElement('div');
            msg.id = 'empty-message';
            msg.className = 'flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-gray-200';
            msg.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <h3 class="text-2xl font-semibold text-gray-700 mt-4">No jobs available</h3>
            <p class="text-gray-500 text-base mt-2">No applications with "${tab}" status</p>
          `;
            container.appendChild(msg);
        }
    } else {
        if (emptyMessage) {
            emptyMessage.remove();
        }
    }

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
let chatPanel = document.querySelector('.chat-panel');
let chatHeadLine = document.querySelector('.chat-headline');
let chatProductDetails = document.querySelector('.chat-product-details');
let chatInputPanel = document.querySelector('.chat-input-panel');
let chatBody = document.querySelector('.chat-body');
if (window.innerWidth > 991) {
    chatBody.style.maxHeight = (chatPanel.offsetHeight - (chatHeadLine.offsetHeight + 132 + chatInputPanel.offsetHeight) - 20) + 'px';
    chatBody.style.paddingBottom = chatInputPanel.offsetHeight / 2 + 'px';
}

const scrollToBottom = () => {
    let elem = document.querySelector('.chat-body');
    elem.scrollTop = elem.scrollHeight;
}

if (window.innerWidth < 992) {
    let chatListCards = document.querySelectorAll('.chatListCard');
    chatListCards.forEach(chatList => {
        chatList.addEventListener('click', () => {
            document.querySelector('.chatList').setAttribute('hidden', 'true');
            document.querySelector('.chat-panel').classList.remove('invisible');
            document.querySelector('.chat-body').classList.remove('invisible');
            document.querySelector('.chat-panel').classList.remove('h-0');
            document.querySelector('.chat-body').classList.remove('h-0');
        })
    })

    document.querySelector('.backToChatList').addEventListener('click', () => {
        document.querySelector('.chatList').removeAttribute('hidden');
        document.querySelector('.chat-panel').classList.add('invisible');
        document.querySelector('.chat-body').classList.add('invisible');
        document.querySelector('.chat-panel').classList.add('h-0');
        document.querySelector('.chat-body').classList.add('h-0');
    })
}

// parse query data from url. This will return a object containing key value pairs
let parseQuery = () => {
    let params = window.location.search.split('?')[1].split('&');

    let query = {};
    params.map(param => {
        let key = param.split('=')[0];
        let value = param.split('=')[1];
        query[key] = value;
    })

    return query;
}

// parse the query object parameters
let queryData = parseQuery();

// by default the loader will be shown until the chat list is loaded
document.querySelector('.chatList').insertAdjacentHTML("beforeend",
    `<div class="flex w-full h-96 justify-center items-center loader">
        <span class="flex h-5 w-5 relative">
            <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span class="relative inline-flex rounded-full h-5 w-5 bg-primary"></span>
        </span>
    </div>`
)

// by default the loader will be shown until the chat messages is loaded
document.querySelector('.chat-body').insertAdjacentHTML("beforeend",
    `<div class="flex w-full h-96 justify-center items-center loader">
        <span class="flex h-5 w-5 relative">
            <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span class="relative inline-flex rounded-full h-5 w-5 bg-primary"></span>
        </span>
    </div>`
)

// get chatList of the member
fetch(`http://tahtaj.r-y-x.net/api/v1/chating/GetChatList?memberId=${queryData.memberId}`)
    .then(response => response.json())
    .then(data => {

        // extract messages from response data
        let { messages } = data.data;

        if (!messages || messages.length === 0) {

            // show spinner if there is no data in messages
            document.querySelector('.chatList').insertAdjacentHTML("beforeend", `
            <div class="flex w-full h-96 justify-center items-center loader">
                <span class="flex h-5 w-5 relative">
                    <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-5 w-5 bg-primary"></span>
                </span>
            </div>
        `)
        }


        if (messages && messages.length) {

            // if there is data in message the hide the spinner
            document.querySelector('.chatList .loader').setAttribute('style', 'display:none !important');

            // set the user name to the receiver title
            document.querySelector('.receiverUser').innerText = messages.find(message => message.sender.memberId === parseInt(queryData.receiverId)).sender.firstName + ' ' + messages.find(message => message.sender.memberId === parseInt(queryData.receiverId)).sender.lastName ?? 'User';

            messages.forEach(message => {

                // render the user chat list
                document.querySelector('.chatList').insertAdjacentHTML("beforeend", `
                    <a href="chats.html?memberId=${queryData.memberId}&receiverId=${message.sender.memberId}&postId=${message.postId}"
                        class="chatListCard border-l-4 ${message.sender.memberId === parseInt(queryData.receiverId) ? 'bg-[#F5F5F5] border-[#00ACE1]' : ''} cursor-pointer normal-transition border-white hover:border-[#00ACE1] hover:bg-[#F5F5F5] px-5 py-4 flex lg:flex-row flex-col items-start lg:items-center justify-start lg:justify-between">
                        <div class="flex">
                            <div class="relative w-12 ">
                                <img class="h-12 w-12 rounded-full ring-1 ring-[#00ACE1]"
                                    src="./src/images/user-img.png" alt="user">
                                    <span
                                        class="${message.notSeenChatCount > 0 ? 'h-4 w-4 bg-secondary text-white flex justify-center items-center text-xs rounded-full absolute top-0 right-0' : 'hidden'}">
                                        ${message.notSeenChatCount}
                                    </span>
                            </div>
                            <div class="w-48 ml-2">
                                <h1 class="text-lg font-semibold">${message.sender.firstName} ${message.sender.lastName}</h1>
                                <div class="flex items-center">
                                    <img src="./src/images/tick-mark.png" alt="tick-mark">
                                        <span class="text-xs text-tertiary truncate">
                                            ${message.lastMessage}
                                        </span>
                                </div>
                            </div>
                        </div>
                        <div class="flex lg:flex-col flex-row mt-3 lg:mt-0">
                            <p class="text-xs text-tertiary text-left lg:text-right">${message.sendingDateTime.split('/').join('-')}</p>
                        </div>
                    </a>
                `)
            })
        }
    })
    .catch(e => {

        // if any error occurs then show the spinner
        document.querySelector('.chatList').insertAdjacentHTML("beforeend", `
            <div class="flex w-full h-96 justify-center items-center loader">
                <span class="flex h-5 w-5 relative">
                    <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-5 w-5 bg-primary"></span>
                </span>
            </div>`
        )
    })


// get product details and chat list
fetch(`http://tahtaj.r-y-x.net/api/v1/chating/message-list`, {
    method: 'POST',
    body: JSON.stringify({
        "conversationId": 0,
        "senderId": 18,
        "text": "",
        "postId": parseInt(queryData.postId),
        "isJobPost": false,
        "receiverId": parseInt(queryData.receiverId),
        "createDate": "",
        "updatedate": "",
        "isSeen": false,
        "seenDate": "2022-02-09T08:49:45.100Z",
        "senderName": "string",
        "senderImage": "string",
        "receiverName": "string",
        "receiverImage": "string"
    }),
    headers: {
        'Content-Type': 'application/json',
    }
})
    .then(res => res.json())
    .then(data => {

        // extract post and chats from response data
        let { post, chats } = data.data.messages;

        // insert post details
        document.querySelector('.postDetails').insertAdjacentHTML("beforeend", `
            <div class="bg-[#F5F5F5] p-4 flex lg:flex-row flex-col mb-1">
                <img class="w-full h-44 lg:w-[8.625rem] lg:h-[6.125rem] rounded-lg mr-4"
                    src="${post.icon}" alt="${post.title}">
                <div>
                    <h1 class="text-sm font-semibold lg:w-56 w-full line-clamp-2">
                        ${post.title}
                    </h1>
                    <h2 class="text-base font-semibold text-secondary">AED ${post.price}</h2>
                    <div class="flex items-center">
                        <img class="mr-1" src="./src/images/location-icon-small.png" alt="location" />
                        <p class="text-xs text-tertiary">${post.city.cityName}</p>
                    </div>
                    <p class="mt-1 text-xs text-tertiary">${chats[0].date}</p>
                </div>
            </div>
        `)

        // insert chats
        if (chats.length) {

            // if chats has array of data then the loader will be hidden
            document.querySelector('.chat-body .loader').setAttribute('style', 'display:none !important');

            // the chat body will automatically scroll to the bottom after 1sec of data loading
            window.setTimeout(function () {
                scrollToBottom()
            }, 1000);

            // render the chats to chat body
            chats.forEach(chat => {
                chat.chatList.map(singleChat => {

                    // if the chat is from other side then render the chat details for receiver
                    if (singleChat.senderId === parseInt(queryData.receiverId)) {
                        document.querySelector('.chat-body').insertAdjacentHTML("beforeend", `
                        <div class="flex mb-6">
                            <img class="h-9 w-9 rounded-full" src="${singleChat.senderImage}" alt="${singleChat.receiverName}">
                            <div class="chat-container">
                                <div class="message from rounded-lg">${singleChat.text}</div>
                                <div class="flex items-center">
                                    <img class="h-2 w-3 mr-3" src="${singleChat.isSeen ? './src/images/tick-mark.png' : './src/images/notSeenImg.png'}" alt="tick-mark">
                                    <p class="text-xs text-tertiary">${new Date(singleChat.seenDate).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</p>
                                </div>
                            </div>
                        </div>
                        `)
                    }

                    // else render sender chat details
                    document.querySelector('.chat-body').insertAdjacentHTML("beforeend", `
                            <div class="flex flex-row-reverse mb-6">
                                <img class="h-9 w-9 rounded-full" src="${singleChat.senderImage}" alt="${singleChat.receiverName}">
                                <div class="chat-container">
                                    <div class="message to rounded-lg">${singleChat.text}</div>
                                    <div class="flex items-center justify-end">
                                        <img class="h-2 w-3 mr-3" src="${singleChat.isSeen ? './src/images/tick-mark.png' : './src/images/notSeenImg.png'}" alt="tick-mark">
                                        <p class="text-xs text-tertiary">${new Date(singleChat.seenDate).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</p>
                                    </div>
                                </div>
                            </div>
                        `)
                })
            })

        }

    })
    .catch(error => {

        // if any error occurs then show the spinner
        document.querySelector('.chat-body').insertAdjacentHTML("beforeend", `
            <div class="flex w-full h-96 justify-center items-center loader">
                <span class="flex h-5 w-5 relative">
                    <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-5 w-5 bg-primary"></span>
                </span>
            </div>`
        )
        console.log(error)
    })
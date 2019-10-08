<template>
<!-- Start of Sidebar -->
<div class="sidebar" id="sidebar" v-if="name !== null">
    <div class="container">
        <div class="col-md-12">
            <div class="tab-content">
                <!-- Start of Contacts -->
                <div class="tab-pane fade" id="members">
                    <div class="search">
                        <form class="form-inline position-relative">
                            <input type="search" class="form-control" id="people" placeholder="Search for people...">
                            <button type="button" class="btn btn-link loop"><i class="material-icons">search</i></button>
                        </form>
                        <button class="btn create" v-on:click="allowAddFr = true"><i class="material-icons">person_add</i></button>
                    </div>
                    <div class="list-group sort">
                        <button class="btn filterMembersBtn active show" data-toggle="list" data-filter="all">All</button>
                        <button class="btn filterMembersBtn" data-toggle="list" data-filter="online">Online</button>
                        <button class="btn filterMembersBtn" data-toggle="list" data-filter="offline">Offline</button>
                    </div>
                    <div class="contacts">
                        <h1>Contacts</h1>
                        <div class="list-group" id="contacts" role="tablist">
                            <a href="#" class="filterMembers all online contact" data-toggle="list">
                                <img class="avatar-md" src="swipe/img/avatars/avatar-female-1.jpg" data-toggle="tooltip" data-placement="top" title="Janette" alt="avatar">
                                <div class="status">
                                    <i class="material-icons online">fiber_manual_record</i>
                                </div>
                                <div class="data">
                                    <h5>Janette Dalton</h5>
                                    <p>Sofia, Bulgaria</p>
                                </div>
                                <div class="person-add">
                                    <i class="material-icons">person</i>
                                </div>
                            </a>
                            <a href="#" class="filterMembers all online contact" data-toggle="list">
                                <img class="avatar-md" src="swipe/img/avatars/avatar-male-1.jpg" data-toggle="tooltip" data-placement="top" title="Michael" alt="avatar">
                                <div class="status">
                                    <i class="material-icons online">fiber_manual_record</i>
                                </div>
                                <div class="data">
                                    <h5>Michael Knudsen</h5>
                                    <p>Washington, USA</p>
                                </div>
                                <div class="person-add">
                                    <i class="material-icons">person</i>
                                </div>
                            </a>
                            <a href="#" class="filterMembers all online contact" data-toggle="list">
                                <img class="avatar-md" src="swipe/img/avatars/avatar-female-2.jpg" data-toggle="tooltip" data-placement="top" title="Lean" alt="avatar">
                                <div class="status">
                                    <i class="material-icons online">fiber_manual_record</i>
                                </div>
                                <div class="data">
                                    <h5>Lean Avent</h5>
                                    <p>Shanghai, China</p>
                                </div>
                                <div class="person-add">
                                    <i class="material-icons">person</i>
                                </div>
                            </a>
                            <a href="#" class="filterMembers all online contact" data-toggle="list">
                                <img class="avatar-md" src="swipe/img/avatars/avatar-male-2.jpg" data-toggle="tooltip" data-placement="top" title="Mariette" alt="avatar">
                                <div class="status">
                                    <i class="material-icons online">fiber_manual_record</i>
                                </div>
                                <div class="data">
                                    <h5>Mariette Toles</h5>
                                    <p>Helena, Montana</p>
                                </div>
                                <div class="person-add">
                                    <i class="material-icons">person</i>
                                </div>
                            </a>
                            <a href="#" class="filterMembers all online contact" data-toggle="list">
                                <img class="avatar-md" src="swipe/img/avatars/avatar-female-3.jpg" data-toggle="tooltip" data-placement="top" title="Harmony" alt="avatar">
                                <div class="status">
                                    <i class="material-icons online">fiber_manual_record</i>
                                </div>
                                <div class="data">
                                    <h5>Harmony Otero</h5>
                                    <p>Indore, India</p>
                                </div>
                                <div class="person-add">
                                    <i class="material-icons">person</i>
                                </div>
                            </a>
                            <a href="#" class="filterMembers all offline contact" data-toggle="list">
                                <img class="avatar-md" src="swipe/img/avatars/avatar-female-5.jpg" data-toggle="tooltip" data-placement="top" title="Keith" alt="avatar">
                                <div class="status">
                                    <i class="material-icons offline">fiber_manual_record</i>
                                </div>
                                <div class="data">
                                    <h5>Keith Morris</h5>
                                    <p>Chisinau, Moldova</p>
                                </div>
                                <div class="person-add">
                                    <i class="material-icons">person</i>
                                </div>
                            </a>
                            <a href="#" class="filterMembers all offline contact" data-toggle="list">
                                <img class="avatar-md" src="swipe/img/avatars/avatar-female-6.jpg" data-toggle="tooltip" data-placement="top" title="Louis" alt="avatar">
                                <div class="status">
                                    <i class="material-icons offline">fiber_manual_record</i>
                                </div>
                                <div class="data">
                                    <h5>Louis Martinez</h5>
                                    <p>Vienna, Austria</p>
                                </div>
                                <div class="person-add">
                                    <i class="material-icons">person</i>
                                </div>
                            </a>
                            <a href="#" class="filterMembers all offline contact" data-toggle="list">
                                <img class="avatar-md" src="swipe/img/avatars/avatar-male-3.jpg" data-toggle="tooltip" data-placement="top" title="Ryan" alt="avatar">
                                <div class="status">
                                    <i class="material-icons offline">fiber_manual_record</i>
                                </div>
                                <div class="data">
                                    <h5>Ryan Foster</h5>
                                    <p>Oslo, Norway</p>
                                </div>
                                <div class="person-add">
                                    <i class="material-icons">person</i>
                                </div>
                            </a>
                            <a href="#" class="filterMembers all offline contact" data-toggle="list">
                                <img class="avatar-md" src="swipe/img/avatars/avatar-male-4.jpg" data-toggle="tooltip" data-placement="top" title="Mildred" alt="avatar">
                                <div class="status">
                                    <i class="material-icons offline">fiber_manual_record</i>
                                </div>
                                <div class="data">
                                    <h5>Mildred Bennett</h5>
                                    <p>London, United Kingdom</p>
                                </div>
                                <div class="person-add">
                                    <i class="material-icons">person</i>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <!-- End of Contacts -->
                <!-- Start of Discussions -->
                <div id="discussions" class="tab-pane fade active show">
                    <div class="search">
                        <form class="form-inline position-relative">
                            <input type="search" class="form-control" id="conversations" placeholder="Search for conversations...">
                            <button type="button" class="btn btn-link loop"><i class="material-icons">search</i></button>
                        </form>
                        <button class="btn create" v-on:click="showchat = true"><i class="material-icons">create</i></button>
                    </div>
                    <div class="list-group sort">
                        <button class="btn filterDiscussionsBtn active show" data-toggle="list" data-filter="all">All</button>
                        <button class="btn filterDiscussionsBtn" data-toggle="list" data-filter="read">Read</button>
                        <button class="btn filterDiscussionsBtn" data-toggle="list" data-filter="unread">Unread</button>
                    </div>
                    <div class="discussions">
                        <h1>Discussions</h1>
                        <div class="list-group" id="chats" role="tablist">
                            <a class="filterDiscussions all single show" v-for="(item, index) in lstCon" v-on:click="getMessage(item, index)" :key='"key-"+item.conversation._id + "-" + index' :id='"id-"+item.conversation._id + "-" + index'>
                                <img class="avatar-md" :src="CON_CONTROLLER + '/getimage/' + item.conversation.image" data-toggle="tooltip" data-placement="top" title="Janette" alt="avatar">
                                <div class="status" v-if="item.conversation.conType == 'PrivateChat'">
                                    <i class="material-icons online" v-if="item.par[0].status == 'Online'" :id="'onlineCon-' +item.conversation._id + '-' + index">fiber_manual_record</i>
                                    <i class="material-icons offline" v-if="item.par[0].status == 'Offline'" :id="'onlineCon-' +item.conversation._id + '-' + index">fiber_manual_record</i>
                                </div>
                                <div class="new bg-yellow">
                                    <span>+7</span>
                                </div>
                                <div class="data">
                                    <h5>{{generateTitle(item)}}</h5>
                                    <span>{{generateDate(item)}}</span>
                                    <p>{{generateMess(item)}}</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <!-- End of Discussions -->
                <!-- Start of Notifications -->
                <div id="notifications" class="tab-pane fade">
                    <div class="search">
                        <form class="form-inline position-relative">
                            <input type="search" class="form-control" id="notice" placeholder="Filter notifications...">
                            <button type="button" class="btn btn-link loop"><i class="material-icons filter-list">filter_list</i></button>
                        </form>
                    </div>
                    <div class="list-group sort">
                        <button class="btn filterNotificationsBtn active show" data-toggle="list" data-filter="all">All</button>
                        <button class="btn filterNotificationsBtn" data-toggle="list" data-filter="latest">Latest</button>
                        <button class="btn filterNotificationsBtn" data-toggle="list" data-filter="oldest">Oldest</button>
                    </div>
                    <div class="notifications">
                        <h1>Notifications</h1>
                        <div class="list-group" id="alerts" role="tablist">
                            <a href="#" class="filterNotifications all latest notification" data-toggle="list">
                                <img class="avatar-md" src="swipe/img/avatars/avatar-female-1.jpg" data-toggle="tooltip" data-placement="top" title="Janette" alt="avatar">
                                <div class="status">
                                    <i class="material-icons online">fiber_manual_record</i>
                                </div>
                                <div class="data">
                                    <p>Janette has accepted your friend request on Swipe.</p>
                                    <span>Oct 17, 2018</span>
                                </div>
                            </a>
                            <a href="#" class="filterNotifications all latest notification" data-toggle="list">
                                <img class="avatar-md" src="swipe/img/avatars/avatar-male-1.jpg" data-toggle="tooltip" data-placement="top" title="Michael" alt="avatar">
                                <div class="status">
                                    <i class="material-icons online">fiber_manual_record</i>
                                </div>
                                <div class="data">
                                    <p>Michael, you have a new friend suggestion today.</p>
                                    <span>Jun 21, 2018</span>
                                </div>
                            </a>
                            <a href="#" class="filterNotifications all latest notification" data-toggle="list">
                                <img class="avatar-md" src="swipe/img/avatars/avatar-male-2.jpg" data-toggle="tooltip" data-placement="top" title="Mariette" alt="avatar">
                                <div class="status">
                                    <i class="material-icons online">fiber_manual_record</i>
                                </div>
                                <div class="data">
                                    <p>Mariette have just sent you a new message.</p>
                                    <span>Feb 15, 2018</span>
                                </div>
                            </a>
                            <a href="#" class="filterNotifications all latest notification" data-toggle="list">
                                <img class="avatar-md" src="swipe/img/avatars/avatar-female-6.jpg" data-toggle="tooltip" data-placement="top" title="Louis" alt="avatar">
                                <div class="status">
                                    <i class="material-icons online">fiber_manual_record</i>
                                </div>
                                <div class="data">
                                    <p>Louis has a birthday today. Wish her all the best.</p>
                                    <span>Mar 23, 2018</span>
                                </div>
                            </a>
                            <a href="#" class="filterNotifications all latest notification" data-toggle="list">
                                <img class="avatar-md" src="swipe/img/avatars/avatar-female-3.jpg" data-toggle="tooltip" data-placement="top" title="Janette" alt="avatar">
                                <div class="status">
                                    <i class="material-icons online">fiber_manual_record</i>
                                </div>
                                <div class="data">
                                    <p>Harmony has accepted your friend request on Swipe.</p>
                                    <span>Jan 5, 2018</span>
                                </div>
                            </a>
                            <a href="#" class="filterNotifications all oldest notification" data-toggle="list">
                                <img class="avatar-md" src="swipe/img/avatars/avatar-female-5.jpg" data-toggle="tooltip" data-placement="top" title="Janette" alt="avatar">
                                <div class="status">
                                    <i class="material-icons offline">fiber_manual_record</i>
                                </div>
                                <div class="data">
                                    <p>Keith have just sent you a new message.</p>
                                    <span>Dec 22, 2017</span>
                                </div>
                            </a>
                            <a href="#" class="filterNotifications all oldest notification" data-toggle="list">
                                <img class="avatar-md" src="swipe/img/avatars/avatar-female-2.jpg" data-toggle="tooltip" data-placement="top" title="Janette" alt="avatar">
                                <div class="status">
                                    <i class="material-icons offline">fiber_manual_record</i>
                                </div>
                                <div class="data">
                                    <p>Michael, you have a new friend suggestion today.</p>
                                    <span>Nov 29, 2017</span>
                                </div>
                            </a>
                            <a href="#" class="filterNotifications all oldest notification" data-toggle="list">
                                <img class="avatar-md" src="swipe/img/avatars/avatar-male-3.jpg" data-toggle="tooltip" data-placement="top" title="Janette" alt="avatar">
                                <div class="status">
                                    <i class="material-icons offline">fiber_manual_record</i>
                                </div>
                                <div class="data">
                                    <p>Ryan have just sent you a new message.</p>
                                    <span>Sep 31, 2017</span>
                                </div>
                            </a>
                            <a href="#" class="filterNotifications all oldest notification" data-toggle="list">
                                <img class="avatar-md" src="swipe/img/avatars/avatar-male-4.jpg" data-toggle="tooltip" data-placement="top" title="Janette" alt="avatar">
                                <div class="status">
                                    <i class="material-icons offline">fiber_manual_record</i>
                                </div>
                                <div class="data">
                                    <p>Mildred has a birthday today. Wish him all the best.</p>
                                    <span>Jul 19, 2017</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <!-- End of Notifications -->
                <!-- Start of Settings -->
                <div class="tab-pane fade" id="settings">
                    <div class="settings">
                        <div class="profile">
                            <img class="avatar-xl" src="swipe/img/avatars/avatar-male-1.jpg" alt="avatar">
                            <h1><a href="#">Michael Knudsen</a></h1>
                            <span>Helena, Montana</span>
                            <div class="stats">
                                <div class="item">
                                    <h2>122</h2>
                                    <h3>Fellas</h3>
                                </div>
                                <div class="item">
                                    <h2>305</h2>
                                    <h3>Chats</h3>
                                </div>
                                <div class="item">
                                    <h2>1538</h2>
                                    <h3>Posts</h3>
                                </div>
                            </div>
                        </div>
                        <div class="categories" id="accordionSettings">
                            <h1>Settings</h1>
                            <!-- Start of My Account -->
                            <div class="category">
                                <a href="#" class="title collapsed" id="headingOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    <i class="material-icons md-30 online">person_outline</i>
                                    <div class="data">
                                        <h5>My Account</h5>
                                        <p>Update your profile details</p>
                                    </div>
                                    <i class="material-icons">keyboard_arrow_right</i>
                                </a>
                                <div class="collapse" id="collapseOne" aria-labelledby="headingOne" data-parent="#accordionSettings">
                                    <div class="content">
                                        <div class="upload">
                                            <div class="data">
                                                <img class="avatar-xl" src="swipe/img/avatars/avatar-male-1.jpg" alt="image">
                                                <label>
                                                    <input type="file">
                                                    <span class="btn button">Upload avatar</span>
                                                </label>
                                            </div>
                                            <p>For best results, use an image at least 256px by 256px in either .jpg or .png format!</p>
                                        </div>
                                        <form>
                                            <div class="parent">
                                                <div class="field">
                                                    <label for="firstName">First name <span>*</span></label>
                                                    <input type="text" class="form-control" id="firstName" placeholder="First name" value="Michael" required>
                                                </div>
                                                <div class="field">
                                                    <label for="lastName">Last name <span>*</span></label>
                                                    <input type="text" class="form-control" id="lastName" placeholder="Last name" value="Knudsen" required>
                                                </div>
                                            </div>
                                            <div class="field">
                                                <label for="email">Email <span>*</span></label>
                                                <input type="email" class="form-control" id="email" placeholder="Enter your email address" value="michael@gmail.com" required>
                                            </div>
                                            <div class="field">
                                                <label for="password">Password</label>
                                                <input type="password" class="form-control" id="password" placeholder="Enter a new password" value="password" required>
                                            </div>
                                            <div class="field">
                                                <label for="location">Location</label>
                                                <input type="text" class="form-control" id="location" placeholder="Enter your location" value="Helena, Montana" required>
                                            </div>
                                            <button class="btn btn-link w-100">Delete Account</button>
                                            <button type="submit" class="btn button w-100">Apply</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <!-- End of My Account -->
                            <!-- Start of Chat History -->
                            <div class="category">
                                <a href="#" class="title collapsed" id="headingTwo" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                    <i class="material-icons md-30 online">mail_outline</i>
                                    <div class="data">
                                        <h5>Chats</h5>
                                        <p>Check your chat history</p>
                                    </div>
                                    <i class="material-icons">keyboard_arrow_right</i>
                                </a>
                                <div class="collapse" id="collapseTwo" aria-labelledby="headingTwo" data-parent="#accordionSettings">
                                    <div class="content layer">
                                        <div class="history">
                                            <p>When you clear your conversation history, the messages will be deleted from your own device.</p>
                                            <p>The messages won't be deleted or cleared on the devices of the people you chatted with.</p>
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="same-address">
                                                <label class="custom-control-label" for="same-address">Hide will remove your chat history from the recent list.</label>
                                            </div>
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="save-info">
                                                <label class="custom-control-label" for="save-info">Delete will remove your chat history from the device.</label>
                                            </div>
                                            <button type="submit" class="btn button w-100">Clear blah-blah</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- End of Chat History -->
                            <!-- Start of Notifications Settings -->
                            <div class="category">
                                <a href="#" class="title collapsed" id="headingThree" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                    <i class="material-icons md-30 online">notifications_none</i>
                                    <div class="data">
                                        <h5>Notifications</h5>
                                        <p>Turn notifications on or off</p>
                                    </div>
                                    <i class="material-icons">keyboard_arrow_right</i>
                                </a>
                                <div class="collapse" id="collapseThree" aria-labelledby="headingThree" data-parent="#accordionSettings">
                                    <div class="content no-layer">
                                        <div class="set">
                                            <div class="details">
                                                <h5>Desktop Notifications</h5>
                                                <p>You can set up Swipe to receive notifications when you have new messages.</p>
                                            </div>
                                            <label class="switch">
                                                <input type="checkbox" checked>
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                        <div class="set">
                                            <div class="details">
                                                <h5>Unread Message Badge</h5>
                                                <p>If enabled shows a red badge on the Swipe app icon when you have unread messages.</p>
                                            </div>
                                            <label class="switch">
                                                <input type="checkbox" checked>
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                        <div class="set">
                                            <div class="details">
                                                <h5>Taskbar Flashing</h5>
                                                <p>Flashes the Swipe app on mobile in your taskbar when you have new notifications.</p>
                                            </div>
                                            <label class="switch">
                                                <input type="checkbox">
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                        <div class="set">
                                            <div class="details">
                                                <h5>Notification Sound</h5>
                                                <p>Set the app to alert you via notification sound when you have unread messages.</p>
                                            </div>
                                            <label class="switch">
                                                <input type="checkbox" checked>
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                        <div class="set">
                                            <div class="details">
                                                <h5>Vibrate</h5>
                                                <p>Vibrate when receiving new messages (Ensure system vibration is also enabled).</p>
                                            </div>
                                            <label class="switch">
                                                <input type="checkbox">
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                        <div class="set">
                                            <div class="details">
                                                <h5>Turn On Lights</h5>
                                                <p>When someone send you a text message you will receive alert via notification light.</p>
                                            </div>
                                            <label class="switch">
                                                <input type="checkbox">
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- End of Notifications Settings -->
                            <!-- Start of Connections -->
                            <div class="category">
                                <a href="#" class="title collapsed" id="headingFour" data-toggle="collapse" data-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                                    <i class="material-icons md-30 online">sync</i>
                                    <div class="data">
                                        <h5>Connections</h5>
                                        <p>Sync your social accounts</p>
                                    </div>
                                    <i class="material-icons">keyboard_arrow_right</i>
                                </a>
                                <div class="collapse" id="collapseFour" aria-labelledby="headingFour" data-parent="#accordionSettings">
                                    <div class="content">
                                        <div class="app">
                                            <img src="swipe/img/integrations/slack.svg" alt="app">
                                            <div class="permissions">
                                                <h5>Skrill</h5>
                                                <p>Read, Write, Comment</p>
                                            </div>
                                            <label class="switch">
                                                <input type="checkbox" checked>
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                        <div class="app">
                                            <img src="swipe/img/integrations/dropbox.svg" alt="app">
                                            <div class="permissions">
                                                <h5>Dropbox</h5>
                                                <p>Read, Write, Upload</p>
                                            </div>
                                            <label class="switch">
                                                <input type="checkbox" checked>
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                        <div class="app">
                                            <img src="swipe/img/integrations/drive.svg" alt="app">
                                            <div class="permissions">
                                                <h5>Google Drive</h5>
                                                <p>No permissions set</p>
                                            </div>
                                            <label class="switch">
                                                <input type="checkbox">
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                        <div class="app">
                                            <img src="swipe/img/integrations/trello.svg" alt="app">
                                            <div class="permissions">
                                                <h5>Trello</h5>
                                                <p>No permissions set</p>
                                            </div>
                                            <label class="switch">
                                                <input type="checkbox">
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- End of Connections -->
                            <!-- Start of Appearance Settings -->
                            <div class="category">
                                <a href="#" class="title collapsed" id="headingFive" data-toggle="collapse" data-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive">
                                    <i class="material-icons md-30 online">colorize</i>
                                    <div class="data">
                                        <h5>Appearance</h5>
                                        <p>Customize the look of Swipe</p>
                                    </div>
                                    <i class="material-icons">keyboard_arrow_right</i>
                                </a>
                                <div class="collapse" id="collapseFive" aria-labelledby="headingFive" data-parent="#accordionSettings">
                                    <div class="content no-layer">
                                        <div class="set">
                                            <div class="details">
                                                <h5>Turn Off Lights</h5>
                                                <p>The dark mode is applied to core areas of the app that are normally displayed as light.</p>
                                            </div>
                                            <label class="switch">
                                                <input type="checkbox">
                                                <span class="slider round mode"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- End of Appearance Settings -->
                            <!-- Start of Language -->
                            <div class="category">
                                <a href="#" class="title collapsed" id="headingSix" data-toggle="collapse" data-target="#collapseSix" aria-expanded="true" aria-controls="collapseSix">
                                    <i class="material-icons md-30 online">language</i>
                                    <div class="data">
                                        <h5>Language</h5>
                                        <p>Select preferred language</p>
                                    </div>
                                    <i class="material-icons">keyboard_arrow_right</i>
                                </a>
                                <div class="collapse" id="collapseSix" aria-labelledby="headingSix" data-parent="#accordionSettings">
                                    <div class="content layer">
                                        <div class="language">
                                            <label for="country">Language</label>
                                            <select class="custom-select" id="country" required>
                                                <option value="">Select an language...</option>
                                                <option>English, UK</option>
                                                <option>English, US</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- End of Language -->
                            <!-- Start of Privacy & Safety -->
                            <div class="category">
                                <a href="#" class="title collapsed" id="headingSeven" data-toggle="collapse" data-target="#collapseSeven" aria-expanded="true" aria-controls="collapseSeven">
                                    <i class="material-icons md-30 online">lock_outline</i>
                                    <div class="data">
                                        <h5>Privacy & Safety</h5>
                                        <p>Control your privacy settings</p>
                                    </div>
                                    <i class="material-icons">keyboard_arrow_right</i>
                                </a>
                                <div class="collapse" id="collapseSeven" aria-labelledby="headingSeven" data-parent="#accordionSettings">
                                    <div class="content no-layer">
                                        <div class="set">
                                            <div class="details">
                                                <h5>Keep Me Safe</h5>
                                                <p>Automatically scan and delete direct messages you receive from everyone that contain explict content.</p>
                                            </div>
                                            <label class="switch">
                                                <input type="checkbox">
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                        <div class="set">
                                            <div class="details">
                                                <h5>My Friends Are Nice</h5>
                                                <p>If enabled scans direct messages from everyone unless they are listed as your friend.</p>
                                            </div>
                                            <label class="switch">
                                                <input type="checkbox" checked>
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                        <div class="set">
                                            <div class="details">
                                                <h5>Everyone can add me</h5>
                                                <p>If enabled anyone in or out your friends of friends list can send you a friend request.</p>
                                            </div>
                                            <label class="switch">
                                                <input type="checkbox" checked>
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                        <div class="set">
                                            <div class="details">
                                                <h5>Friends of Friends</h5>
                                                <p>Only your friends or your mutual friends will be able to send you a friend reuqest.</p>
                                            </div>
                                            <label class="switch">
                                                <input type="checkbox" checked>
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                        <div class="set">
                                            <div class="details">
                                                <h5>Data to Improve</h5>
                                                <p>This settings allows us to use and process information for analytical purposes.</p>
                                            </div>
                                            <label class="switch">
                                                <input type="checkbox">
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                        <div class="set">
                                            <div class="details">
                                                <h5>Data to Customize</h5>
                                                <p>This settings allows us to use your information to customize Swipe for you.</p>
                                            </div>
                                            <label class="switch">
                                                <input type="checkbox">
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- End of Privacy & Safety -->
                            <!-- Start of Logout -->
                            <div class="category">
                                <a href="sign-in.html" class="title collapsed">
                                    <i class="material-icons md-30 online">power_settings_new</i>
                                    <div class="data">
                                        <h5>Power Off</h5>
                                        <p>Log out of your account</p>
                                    </div>
                                    <i class="material-icons">keyboard_arrow_right</i>
                                </a>
                            </div>
                            <!-- End of Logout -->
                        </div>
                    </div>
                </div>
                <!-- End of Settings -->
            </div>
        </div>
    </div>
    <Createchat :showchat="showchat" v-on:closechat="showchat = false"></Createchat>
    <Addfriend :showfriend="allowAddFr" v-on:clsfriend="allowAddFr = false"></Addfriend>
</div>
<!-- End of Sidebar -->
</template>

<script>
import Createchat from "@/components/createchat.vue";
import Addfriend from "@/components/addfriend.vue";
var moment = require('moment');

export default {
    name: "Sidebar",
    props: ["name", "keysidebar"],
    components: {
        Createchat,
        Addfriend,
    },
    watch: {
        // name: function(val){
        // 	if(val !== null){
        // 		this.selectSideBar(val);
        // 	}
        // },
        keysidebar: function (oldV, newV) {
            if (newV !== oldV) {
                this.selectSideBar(this.name);
                this.$emit('resetkeybar');
            }
        }
    },
    sockets: {
        connect() {},
        count(val) {},
        message(data) {},
        checkonline(data) {

        },
        rechecklist(data) {
            console.log(data);
            if (data.recheck) {
                this.$socket.emit("checklist", this.listActive);
            }
        },
        checklist(data) {
            console.log("Ok");
            this.listCheckActive = data;
            let listUpdate = [];
            for (let i = 0; i < this.lstCon.length; i++) {
                if (this.lstCon[i].conversation.conType == 'PrivateChat') {
                    let updateCon = new Object(this.lstCon[i]);
                    updateCon.par[0].status = "Offline";
                    this.lstCon.splice(i, 1, updateCon);
                    this.listCheckActive.forEach((item) => {
                        if (this.lstCon[i].par[0]._id == item && !listUpdate.includes(i)) {
                            listUpdate.push(i);
                        }
                    });
                }
            }
            console.log("Value = " + listUpdate);
            listUpdate.forEach(item => {
                let updateCon = new Object(this.lstCon[item]);
                updateCon.par[0].status = "Online";
                this.lstCon.splice(item, 1, updateCon);
            });
            if (listUpdate.length == 0) {
                for (let i = 0; i < this.lstCon.length; i++) {
                    let updateCon = new Object(this.lstCon[i]);
                    updateCon.par[0].status = "Offline";
                    this.lstCon.splice(i, 1, updateCon);
                }
            }
            //console.log(data);
        }
    },
    data() {
        return {
            showchat: false,
            bar: null,
            allowAddFr: false,
            CON_CONTROLLER: this.$api.getApi() + "/conversation",
            lstCon: [],
            listActive: [],
            listCheckActive: [],
        }
    },
    mounted() {
        this.getConv();
    },
    methods: {
        enableChat: function () {
            this.showchat = true;
        },
        enableShowFr: function () {
            this.allowAddFr = true;
        },
        Showbar: function (id) {
            $(document).ready(function () {
                $("div.tab-pane").fadeOut(100, function () {
                    $("div.tab-pane").removeClass("show active");
                });
                $("div#" + id).fadeIn(100, function () {
                    $("div#" + id).addClass("show active");
                });
            });
            this.bar = id;
        },
        selectSideBar: function (val) {
            switch (val) {
                case "members":
                    this.Showbar("members");
                    break;
                case "notifications":
                    this.Showbar("notifications");
                    break;
                case "settings":
                    this.Showbar("settings");
                    break;
                default:
                    this.Showbar("discussions");
                    break;
            }
        },
        getConv(nextid = null) {
            this.$http
                .post(this.CON_CONTROLLER + "/getconv", {
                    nextid: nextid
                })
                .then(res => {
                    if (res.data.success) {
                        this.lstCon = res.data.content;
                        let listUsrId = [];
                        for (let i = 0; i < this.lstCon.length; i++) {
                            if (this.lstCon[i].conversation.conType == "PrivateChat") {
                                this.listActive.push(this.lstCon[i].par[0]._id);
                                this.lstCon[i].par[0].status = "Offline";
                            }
                        }
                        this.$socket.emit("checklist", this.listActive);
                        // this.getUsrImg();
                    }
                })
                .catch();
        },
        generateTitle(item) {
            let title = "";
            switch (item.conversation.conType) {
                case "PrivateChat":
                    title = item.par[0].firstname + " " + item.par[0].lastname;
                    break;
                case "GroupChat":
                    if (item.conversation.title !== null && item.conversation.title !== undefined && item.conversation.title !== "") {
                        title = item.conversation.title;
                    } else {
                        item.par.forEach((val, index) => {
                            let fullname = val.par.firstname + " " + val.par.lastname;
                            title += fullname + ", ";
                        })
                    }
                    break;
                default: {
                    return "";
                }

            }
            return title;
        },
        generateMess(item) {
            let name = item.senderInfo.firstname;
            let mess = item.mess.message;
            return name + ":" + mess;
        },
        generateDate(item) {
            return moment(item.conversation.lastMessageTime).format("dddd");
        },
        getMessage(item, index) {
            $(document).ready(function () {
                $("a.filterDiscussions").removeClass("unread active");
                $("a#id-" + item.conversation._id + "-" + index).removeClass("unread");
                $("a#id-" + item.conversation._id + "-" + index).addClass("active");
            });
            this.$emit("getcon", item);
        }
    },
}
</script>

<style>

</style>

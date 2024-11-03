'use strict';

window.DefineScript('PlayControl, Based on: track info + seekbar + buttons.js and last.fm lover.js by marc2003', {
  author: 'whistlechips',
  options: {
    grab_focus: false
  }
});
include(fb.ComponentPath + 'samples\\complete\\js\\helpers.js');
include(fb.ComponentPath + 'samples\\complete\\js\\lodash.min.js');
include(fb.ComponentPath + 'samples\\complete\\js\\panel.js');
include(fb.ComponentPath + 'samples\\complete\\js\\seekbar.js');
include(fb.ComponentPath + 'samples\\complete\\js\\lastfm.js');
include(fb.ComponentPath + 'samples\\complete\\js\\volume.js');
include(fb.ComponentPath + 'samples\\complete\\js\\albumart.js');

const _tooltip = utils.CheckFont("Roboto") ? window.CreateTooltip('Roboto', _scale(7)) : window.CreateTooltip('Segoe UI', _scale(7)); // I don't know why this overrides function tooltip() is helper.js.

const chrs = {
  prf: '\ue713',
  prev: '\ue892',
  rwind: '\ued3c', //'\ueb9e',
  play: '\uF5B0',
  pause: '\ue768',
  ffwd: '\ued3d', //'\ueb9d',
  next: '\ue893',
  save: '\ue78c',
  search: '\ue721',
  dsp: '\uf8a6', //'\uF4C3',
  mute: '\ue74f',
  vol0: '\ue992',
  vol1: '\ue993',
  vol2: '\ue994',
  vol3: '\ue995',
  repeat_all: '\ue8ee',
  repeat_one: '\ue8ed',
  repeat_off: '\uf5e7',
  shuffle: '\ue8b1',
  random: '\ue9ce',
  album: '\ue93c',
  folder: '\ued25',
  skipoff: '\uf0b5', //'\uf204',
  skip: '\uea98', //'\uf205',
  info: '\uE9CE',
  loved: '\uE0A5',
  unloved: '\uE006',
};

let ppt = {
  artist: window.GetProperty('Custom TitleFormat Summary Artist', '[%artist%]  •  [%album%][  •  %date%]'),
  title: window.GetProperty('Custom TitleFormat Summary Title', '[%title%]'),
  album: window.GetProperty('Custom TitleFormat Summary Album', '%bitrate% kbs  •  %codec% %codec_profile%  •  %samplerate% Hz  •  $caps(%channels%)  •  %filesize_natural%'),
  pb_time: window.GetProperty('Custom TitleFormat Playback Time', '[%playback_time%] '),
  pb_len: window.GetProperty('Custom TitleFormat Playback Length', '[%playback_time_remaining%]'),
  textnormal: window.GetProperty('Custom Color Normal Text (r,g,b)', '160,160,160'),
  texthighlight: window.GetProperty('Custom Color Highlight Text (r,g,b)', '255,255,255'),
  background: window.GetProperty('Custom Color Background (r,g,b)', '32,32,32'),
  seekprog: window.GetProperty('Custom Color Seekbar Progress (r,g,b)', '200,97,44'),
  seekplay: window.GetProperty('Custom Color Seekbar Play (r,g,b)', '64,64,64'),
  seekpause: window.GetProperty('Custom Color Seekbar Paused (r,g,b)', '16,16,16'),
  heart: window.GetProperty('Custom Color Love Heart (r,g,b)', '95,0,16'),
  showalbumart: window.GetProperty('Now Playing Album Art Display', true),
  artsize: window.GetProperty('Now Playing Album Art Size (px)', 60),
  summary: window.GetProperty('Now Playing Summary Display', true),
  title_fsize: window.GetProperty('Now Playing Font Size Title', 10),
  artist_fsize: window.GetProperty('Now Playing Font Size Artist', 9),
  album_fsize: window.GetProperty('Now Playing Font Size Album', 8),
  bs: window.GetProperty('Custom Button Size (20-40px)', 28),
  play_btn_bg: window.GetProperty('Transport Button Background', false),
  play_btn_border: window.GetProperty('Transport Button Border', false),
  short_btn_bg: window.GetProperty('Shortcut Button Background', false),
  short_btn_border: window.GetProperty('Shortcut Button Border', false),
  seekbar_border: window.GetProperty('Seekbar Border', false),
  volbar_border: window.GetProperty('Volume Bar Border', false),
  panel_border: window.GetProperty('Panel Border', false),
  seekbar_handle: window.GetProperty('Seekbar Handle Size (px)', 12),
  seekbar_height: window.GetProperty('Seekbar Thickness (px)', 6),
  play_btn_count: 7, // NUMBER OF PLAYBACK AND SHORTCUT CONTROL BUTTONS UNDER SEEKBAR AND VOLUME BAR.
  short_btn_count: 5,
};

let panel = new _panel();
let seekbar = new _seekbar(0, 0, 0, 0);
let volbar = new _volume(0, 0, 0, 0);
let buttons = new _buttons();
let lastfm = new _lastfm();
let albumart = null;
let art = {x: 0, y: 0, w: 0, h: 0};
let awesome = _gdiFont('FontAwesome', 43, 0); // regular: 0, bold: 1, italic: 2, bold_italic: 3, underline: 4, strikeout: 8
let fluent = _gdiFont('Segoe Fluent Icons', 38, 0);

let vn, vh, vm, n, h, lfm_func, tip;
let bs = Math.floor(ppt.bs >= 20 && ppt.bs <= 40 ? _scale(ppt.bs) : _scale(28));

let handle_h = 0;
let handle_y = 0;
let time_y = 0;

let colors = {
  SeekPause: make_rgb(ppt.seekpause),
  SeekPlay: make_rgb(ppt.seekplay),
  TextNormal: make_rgb(ppt.textnormal),
  TextHighlight: make_rgb(ppt.texthighlight),
  Heart: make_rgb(ppt.heart),
  SeekProgress: make_rgb(ppt.seekprog),
  Background: make_rgb(ppt.background),
};

//STRUCTURE FOR BUTTON SETUPS IN BUTTONS.UPDATE()
function btn(c, d, n, h, t, f, e, z, s) {
  this.c = c; //index
  this.d = d; //designator
  this.n = n; //normal char
  this.h = h; //hover char
  this.t = t; //tip
  this.f = f; //function/command
  this.e = e; //button type: play cntrl (px) or function (fx)
  this.x = function () {
    switch (true) {
    case this.d == 'play':
      return this.e + (bs * this.c) - (bs / 4);
      break;
    case this.d == 'volume':
      return volbar.x - bs;
      break;
    default:
      return this.e + (bs * this.c);
    };
  };
  this.y = function () {
    switch (true) {
    case this.d == 'play':
      return (seekbar.y + seekbar.h + _scale(4)) - (bs * .25);
      break;
    case this.d == 'volume':
      return  volbar.y - ((bs - volbar.h) / 2);
      break;
    default:
      return (seekbar.y + seekbar.h + _scale(4));
    };
  };
  this.z = function () { //button size
    return this.d == 'play' ? bs * 1.5 : bs;
  };
  this.s = function () { //button char change based on state
    switch (true) {
    case this.d == 'play':
      return !fb.IsPlaying || fb.IsPaused ? this.h : this.n;
      break;
    case this.d == 'skip':
      return !fb.IsMainMenuCommandChecked('Playback/Skip tracks & use bookmarks') ? this.n : this.h;
      break;
    default:
      return this.n;
    };
  };
};

//USER SWITCHABLE BUTTON BACKGROUNDS
function btn_bg (x, w) {
  this.x = x;
  this.y = function () {
    return (seekbar.y + seekbar.h + _scale(4)) + _scale(1.5);
  };
  this.w = w;
  this.h = function () {
    return Math.floor(bs - _scale(4));
  };
};

// OBJECTS FOR TEXT ELEMENTS
function tfo(tf, size, type) {
  this.tf = tf;
  this.size = size;
  this.type = type;
  this.font = function () {
    return utils.CheckFont("Roboto") ? _gdiFont("Roboto", this.size, this.type) : _gdiFont("Segoe UI", this.size, this.type);
  };
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function on_paint(gr) {
  let arc = Math.floor(seekbar.h / 2); // diameter for FillRoundRect func for progress and volume bars
  let _arc =  Math.floor((bs - _scale(4)) / 2);

  gr.FillSolidRect(0, 0, panel.w, panel.h, colors.Background);
  ppt.panel_border ? gr.DrawRect(0, 0, panel.w-1, panel.h-1, 1, colors.SeekPlay) : '';

  // GET AND DISPLAY ALBUM ART (OR NOT)
  let summ_x; // X POS FOR SUMMARY TEXT
  albumart = utils.GetAlbumArtV2(panel.metadb, 0);
  if (albumart && ppt.showalbumart) {
    _drawImage(gr, albumart, art.x, art.y, art.w, art.h);
    summ_x = art.x == 0 ? art.x + art.w + 8 : art.w + (art.x + 8);
  } else
    summ_x = 10;

  // NOW PLAYING TEXT
  let title = new tfo(fb.TitleFormat(ppt.title), ppt.title_fsize, 1);
  let artist = new tfo(fb.TitleFormat(ppt.artist), ppt.artist_fsize, 0);
  let album = new tfo(fb.TitleFormat(ppt.album), ppt.album_fsize, 0);
  let pb_time = new tfo(fb.TitleFormat(ppt.pb_time), 9, 0);
  let pb_len = new tfo(fb.TitleFormat(ppt.pb_len), 9, 0);
  let title_hgt = gr.CalcTextHeight(title.tf.Eval(), title.font()) * 1.2; // 20% leading added to font height.
  let artist_hgt = gr.CalcTextHeight(artist.tf.Eval(), artist.font()) * 1.2;
  let album_hgt = gr.CalcTextHeight(album.tf.Eval(), album.font()) * 1.2;
  let time_hgt = gr.CalcTextHeight(pb_time.tf.Eval(), pb_time.font());
  let pb_time_w = gr.CalcTextWidth(pb_time.tf.Eval(), pb_time.font());
  let pb_time_x = seekbar.x - pb_time_w;
  let summ_y = art.y + ((art.h - (title_hgt + artist_hgt + album_hgt)) / 2);
  let summ_w = (seekbar.x - bs - pb_time_w) - summ_x;
  time_y = seekbar.y - ((time_hgt - seekbar.h) / 2);
  
  // NOTE: Please use the flag DT_NOPREFIX, or a '&' character will become an underline '_'
  ppt.summary ? gr.GdiDrawText(title.tf.Eval(), title.font(), !fb.IsPlaying || fb.IsPaused ? colors.TextNormal : colors.TextHighlight, summ_x, summ_y, summ_w, title_hgt, DT_LEFT | DT_VCENTER | DT_NOPREFIX | DT_END_ELLIPSIS) : '';
  ppt.summary ? gr.GdiDrawText(artist.tf.Eval(), artist.font(), !fb.IsPlaying || fb.IsPaused ? colors.TextNormal : colors.TextHighlight, summ_x, summ_y + title_hgt, summ_w, artist_hgt, DT_LEFT | DT_VCENTER | DT_NOPREFIX | DT_END_ELLIPSIS) : '';
  ppt.summary ? gr.GdiDrawText(album.tf.Eval(), album.font(), !fb.IsPlaying || fb.IsPaused ? colors.TextNormal : colors.TextHighlight, summ_x, summ_y + title_hgt + artist_hgt, summ_w, album_hgt, DT_LEFT | DT_VCENTER | DT_NOPREFIX | DT_END_ELLIPSIS) : '';

  gr.SetSmoothingMode(2); // Default: 0, HighSpeed: 1, HighQuality: 2, None: 3, AntiAlias: 4

  // User preferences for button filled background rectangles and borders
  let pb_bg = new btn_bg(Math.floor(seekbar.x + ((seekbar.w - (ppt.play_btn_count * bs)) / 2)), ppt.play_btn_count * bs + _scale(6));
  let short_bg = new btn_bg(Math.floor(volbar.x + ((volbar.w - (ppt.short_btn_count * bs)) / 2)), ppt.short_btn_count * bs + _scale(6));
  ppt.play_btn_bg ?  gr.FillRoundRect( pb_bg.x, pb_bg.y(), pb_bg.w, pb_bg.h(), _arc, _arc, !fb.IsPlaying || fb.IsPaused ? colors.SeekPause : colors.SeekPlay  ) : '';
  ppt.play_btn_border ? gr.DrawRoundRect( pb_bg.x, pb_bg.y(), pb_bg.w, pb_bg.h(), _arc, _arc, 1, colors.TextNormal  ) : '';
  ppt.short_btn_bg ? gr.FillRoundRect( short_bg.x, short_bg.y(), short_bg.w, short_bg.h(), _arc, _arc, !fb.IsPlaying || fb.IsPaused ? colors.SeekPause : colors.SeekPlay  ) : '';
  ppt.short_btn_border ? gr.DrawRoundRect( short_bg.x, short_bg.y(), short_bg.w, short_bg.h(), _arc, _arc, 1, colors.TextNormal  ) : '';

  // SEEK BAR: function FillRoundRect(): https://github.com/TheQwertiest/foo_spider_monkey_panel/blob/master/foo_spider_monkey_panel/js_backend/objects/gdi/gdi_graphics.cpp
  gr.FillRoundRect(seekbar.x, seekbar.y, seekbar.w, seekbar.h, arc, arc, !fb.IsPlaying || fb.IsPaused ? colors.SeekPause : colors.SeekPlay);
  if (fb.IsPlaying) {
    if (fb.PlaybackLength > 0) {
       // seekbar progress: qwr::QwrException::ExpectTrue( 2 * arc_width <= w   && 2 * arc_height <= h, "Arc argument has invalid value" );
      gr.FillRoundRect(seekbar.x, seekbar.y, seekbar.pos() + seekbar.h, seekbar.h, arc, arc, !fb.IsPlaying || fb.IsPaused ? colors.SeekPause : colors.SeekProgress);
      ppt.seekbar_border ? gr.DrawRoundRect(seekbar.x, seekbar.y, seekbar.w, seekbar.h, arc,arc, 1, colors.TextNormal) : '';
      // seekbar handle
      gr.FillEllipse(seekbar.x + seekbar.pos(), handle_y, handle_h, handle_h, !fb.IsPlaying || fb.IsPaused ? colors.TextHighlight & colors.TextNormal : colors.TextHighlight);
    }
  }

  // VOLUME BAR
  gr.FillRoundRect(volbar.x, volbar.y, volbar.w + _scale(6), volbar.h, arc, arc, !fb.IsPlaying || fb.IsPaused ? colors.SeekPause : colors.SeekPlay);
  gr.FillRoundRect(volbar.x, volbar.y, volbar.pos() + 10, volbar.h, arc, arc, !fb.IsPlaying || fb.IsPaused ? colors.SeekPause : colors.SeekProgress);
  ppt.volbar_border ? gr.DrawRoundRect(volbar.x, volbar.y, volbar.w + _scale(6), volbar.h, arc, arc, 1, colors.TextNormal) : '';
  gr.FillEllipse(volbar.x + volbar.pos(), handle_y, handle_h, handle_h, !fb.IsPlaying || fb.IsPaused ? colors.TextHighlight & colors.TextNormal : colors.TextHighlight);

  // TIME ELAPSED / TIME REMAINING
  gr.GdiDrawText(pb_time.tf.Eval(), pb_time.font(), !fb.IsPlaying || fb.IsPaused ? colors.TextNormal : colors.TextHighlight, pb_time_x, time_y, pb_time_w, time_hgt, DT_RIGHT | DT_VCENTER | DT_CALCRECT | DT_NOPREFIX | DT_END_ELLIPSIS);
  gr.GdiDrawText(pb_len.tf.Eval(), pb_len.font(), !fb.IsPlaying || fb.IsPaused ? colors.TextNormal : colors.TextHighlight, seekbar.x + seekbar.w + _scale(10), time_y, _scale(35), time_hgt, DT_LEFT | DT_VCENTER | DT_CALCRECT | DT_NOPREFIX | DT_END_ELLIPSIS);

  buttons.paint(gr);
}

////////////////////////////////////////////////////////////////////////////////
//BUTTONS UPDATE
////////////////////////////////////////////////////////////////////////////////

buttons.update = function () {

  let pbo_chrs = [chrs.repeat_off, chrs.repeat_all, chrs.repeat_one, chrs.random, chrs.shuffle, chrs.album, chrs.folder];
  let pbo_names = ['repeat_off', 'repeat_all', 'repeat_one', 'random', 'shuffle', 'album', 'folder'];
  let pbo = plman.PlaybackOrder; // 0-Default, 1-Repeat (Playlist),2-Repeat (Track),3-Random,4-Shuffle (tracks),5-Shuffle (albums),6-Shuffle (folders)
  let pc = 0, fc = 0; // COUNTERS FOR PLAYBACK AND SHORTCUT BUTTONS.
  let px = Math.floor(seekbar.x + ((seekbar.w - (ppt.play_btn_count * bs)) / 2)); // BUTTON X POSITION FOR FIRST PLAYBACK BUTTON UNDER SEEKBAR.
  let fx = volbar.x + ((volbar.w - (ppt.short_btn_count * bs)) / 2); // BUTTON X POSITION FOR FIRST SHORTCUT BUTTON UNDER VOLUME BAR.
  let vm = fb.Volume.toFixed(2);
  let vb = vm == -100 ? chrs.mute : vm < -25 ? chrs.vol0 : vm < -10 ? chrs.vol1 : vm < -4 ? chrs.vol2 : chrs.vol3;

  lfm_icons();

  // POPULATE BTN STRUCTURES
  let lo = new btn(0, 'love', n, h, tip, lfm_func, px);
  let pr = new btn(1, 'prev', _chrToImg(chrs.prev, colors.TextNormal, fluent), _chrToImg(chrs.prev, colors.TextHighlight, fluent), 'Previous Track', function () { fb.Prev(); }, px);
  let re = new btn(2, 'rwind', _chrToImg(chrs.rwind, colors.TextNormal, fluent), _chrToImg(chrs.rwind, colors.TextHighlight, fluent), 'Rewind 10 Seconds', function () { fb.RunMainMenuCommand('Playback/Seek/Back by 10 seconds'); }, px);
  let pl = new btn(3, 'play', !fb.IsPlaying || fb.IsPaused ? _chrToImg(chrs.pause, colors.TextNormal, fluent) : _chrToImg(chrs.play, colors.TextHighlight, fluent), _chrToImg(chrs.play, colors.TextHighlight, fluent), 'click to play or pause', function () { fb.PlayOrPause(); }, px);
  let ff = new btn(4, 'ffwd', _chrToImg(chrs.ffwd, colors.TextNormal, fluent), _chrToImg(chrs.ffwd, colors.TextHighlight, fluent), 'Forward 30 Seconds', function () { fb.RunMainMenuCommand('Playback/Seek/Ahead by 30 seconds'); }, px);
  let ne = new btn(5, 'next', _chrToImg(chrs.next, colors.TextNormal, fluent), _chrToImg(chrs.next, colors.TextHighlight, fluent), 'Next Track', function () { fb.Next(); }, px);
  let pb = new btn(6, 'pbo', _chrToImg(pbo_chrs[pbo], colors.TextNormal, fluent), _chrToImg(pbo_chrs[pbo], colors.TextHighlight, fluent), 'Playback Order: ' + pbo_names[pbo], function () { pbo >= pbo_chrs.length - 1 ? plman.PlaybackOrder = 0 : plman.PlaybackOrder++ }, px);
  let pf = new btn(0, 'pref', _chrToImg(chrs.prf, colors.TextNormal, fluent), _chrToImg(chrs.prf, colors.TextHighlight, fluent), 'Preferences', function () { fb.ShowPreferences(); }, fx);
  let ds = new btn(1, 'dsp', _chrToImg(chrs.dsp, colors.TextNormal, fluent), _chrToImg(chrs.dsp, colors.TextHighlight, fluent), 'DSP Prefs', function () { fb.RunMainMenuCommand('Playback/DSP Settings/Preferences'); }, fx);
  let se = new btn(2, 'search', _chrToImg(chrs.search, colors.TextNormal, fluent), _chrToImg(chrs.search, colors.TextHighlight, fluent), 'Facets Search', function () { fb.RunMainMenuCommand('Library/Facets'); }, fx);
  let sa = new btn(3, 'save', _chrToImg(chrs.save, colors.TextNormal, fluent), _chrToImg(chrs.save, colors.TextHighlight, fluent), 'Save all playlists', function () { fb.RunMainMenuCommand('File/Save all playlists...'); }, fx);
  let sk = new btn(4, 'skip', _chrToImg(!fb.IsMainMenuCommandChecked('Playback/Skip tracks & use bookmarks') ? chrs.skipoff : chrs.skip, colors.TextNormal, fluent), _chrToImg(chrs.skip, colors.TextHighlight, fluent), 'Enable foo_skip component', function () { fb.RunMainMenuCommand('Playback/Skip tracks & use bookmarks'); }, fx);
  let vo = new btn(0, 'volume', _chrToImg(vb, colors.TextNormal, fluent), _chrToImg(vb, colors.TextHighlight, fluent), 'Volume: ' + vm + ' dB', function () { fb.VolumeMute(); });

   // CREATE THE BUTTONS
  buttons.buttons.love = new _button(lo.x(), lo.y(), lo.z(), lo.z(), { normal: lo.n, hover: lo.h }, lo.f, lo.t);
  buttons.buttons.prev = new _button(pr.x(), pr.y(), pr.z(), pr.z(), { normal: pr.n, hover: pr.h }, pr.f, pr.t);
  buttons.buttons.rwind = new _button(re.x(), re.y(), re.z(), re.z(), { normal: re.n, hover: re.h }, re.f, re.t);
  buttons.buttons.play = new _button(pl.x(), pl.y(), pl.z(), pl.z(), { normal: pl.n, hover: pl.h }, pl.f, pl.t);
  buttons.buttons.next = new _button(ne.x(), ne.y(), ne.z(), ne.z(), { normal: ne.n, hover: ne.h }, ne.f, ne.t);
  buttons.buttons.ffwd = new _button(ff.x(), ff.y(), ff.z(), ff.z(), { normal: ff.n, hover: ff.h }, ff.f, ff.t);
  buttons.buttons.pbo = new _button(pb.x(), pb.y(), pb.z(), pb.z(), { normal: pb.n, hover: pb.h }, pb.f, pb.t);
  buttons.buttons.pref = new _button(pf.x(), pf.y(), pf.z(), pf.z(), { normal: pf.n, hover: pf.h }, pf.f, pf.t);
  buttons.buttons.dsp = new _button(ds.x(), ds.y(), ds.z(), ds.z(), { normal: ds.n, hover: ds.h }, ds.f, ds.t);
  buttons.buttons.search = new _button(se.x(), se.y(), se.z(), se.z(), { normal: se.n, hover: se.h }, se.f, se.t);
  buttons.buttons.save = new _button(sa.x(), sa.y(), sa.z(), sa.z(), { normal: sa.n, hover: sa.h }, sa.f, sa.t);
  buttons.buttons.skip = new _button(sk.x(), sk.y(), sk.z(), sk.z(), { normal: sk.n, hover: sk.h }, sk.f, sk.t);
  buttons.buttons.volume = new _button(vo.x(), vo.y(), vo.z(), vo.z(), { normal: vo.n, hover: vo.h }, vo.f, vo.t);
  
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function make_rgb(a) {
  let b = a.split(",");
  return _RGB(b[0], b[1], b[2]);
};

function lfm_icons() {
  switch (true) { ///////////////////////////// marc2003 LAST.FM STUFF.
  case lastfm.username.length == 0 || lastfm.sk.length != 32:
    n = _chrToImg(chrs.info, colors.TextNormal, fluent);
    h = _chrToImg(chrs.info, colors.TextNormal, fluent);
    lfm_func = null;
    tip = 'Right click to set your Last.fm username and authorise.';
    break;
  case !panel.metadb:
    n = _chrToImg(chrs.info, colors.TextNormal, fluent);
    h = _chrToImg(chrs.info, colors.TextNormal, fluent);
    lfm_func = null;
    tip = 'No selection';
    break;
  case _.parseInt(panel.tf('%SMP_LOVED%')) == 1:
    n = _chrToImg(chrs.loved, colors.Heart, fluent);
    h = _chrToImg(chrs.unloved, colors.TextNormal, fluent);
    lfm_func = function () {
      lastfm.post('track.unlove', null, panel.metadb);
    }
    tip = panel.tf('Unlove "%title%" by "%artist%"');
    break;
  default:
    n = _chrToImg(chrs.unloved, colors.TextNormal, fluent);
    h = _chrToImg(chrs.loved, colors.Heart, fluent);
    lfm_func = function () {
      lastfm.post('track.love', null, panel.metadb);
    }
    tip = panel.tf('Love "%title%" by "%artist%"');
  };
};

////////////////////////////////////////////////////////////////////////////////
//										               callbacks       		                      //
////////////////////////////////////////////////////////////////////////////////

function on_colors_changed() {
  panel.colors_changed();
  window.Repaint(true);
}

function on_font_changed() {
  panel.font_changed();
  window.Repaint();
}

function on_item_focus_change() {
  panel.item_focus_change();
}

function on_metadb_changed() {
  buttons.update();
  window.Repaint();
}

function on_mouse_lbtn_down(x, y) {
  seekbar.lbtn_down(x, y);
  volbar.lbtn_down(x, y);
}

function on_mouse_lbtn_up(x, y, mask) {
  if (buttons.lbtn_up(x, y, mask)) {
    return;
  }
  if (seekbar.lbtn_up(x, y)) {
    return;
  }
  if (volbar.lbtn_up(x, y)) {
    return;
  }
  fb.RunMainMenuCommand('View/Highlight Now Playing');
}

function on_mouse_leave() {
  buttons.leave();
}

function on_mouse_move(x, y) {
  if (buttons.move(x, y)) {
    return;
  }
  volbar.move(x, y);
  seekbar.move(x, y);
}

function on_mouse_rbtn_up(x, y) {
  if (buttons.buttons.love.trace(x, y)) {
    const flag = lastfm.username.length ? MF_STRING : MF_GRAYED;
    let m = window.CreatePopupMenu();
    m.AppendMenuItem(MF_STRING, 1, 'Last.fm username...');
    m.AppendMenuItem(flag, 2, 'Authorise');
    m.AppendMenuItem(flag, 3, 'Bulk import Last.fm loved tracks');
    m.AppendMenuItem(MF_STRING, 4, 'Show loved tracks');
    m.AppendMenuItem(MF_STRING, 5, 'Configure...');
    const idx = m.TrackPopupMenu(x, y);
    switch (idx) {
    case 1:
      lastfm.update_username();
      break;
    case 2:
      lastfm.post('auth.getToken');
      break;
    case 3:
      lastfm.get_loved_tracks(1);
      break;
    case 4:
      fb.ShowLibrarySearchUI('%SMP_LOVED% IS 1');
      break;
    case 5:
      window.ShowConfigure();
      break;
    }
  } else {
    panel.rbtn_up(x, y);
  }
  return true;
}


function on_mouse_wheel(s) {
  if (seekbar.wheel(s)) {
    return;
  }
  volbar.wheel(s);
}

function on_notify_data(name, data) {
  lastfm.notify_data(name, data);
}

function on_output_device_changed() {
  buttons.update();
}

function on_playback_dynamic_info_track(type) {
  if (type == 0)
    window.Repaint();
  else
    update_album_art(fb.GetNowPlaying());
}

function on_playback_edited() {
  window.Repaint();
}

function on_playback_new_track(metadb) {
  if (!metadb) {
    return;
  }
  albumart = utils.GetAlbumArtV2(panel.metadb, 0);
  window.Repaint();
}

function on_playback_order_changed() {
  buttons.update();
  window.Repaint();
}

function on_playback_pause() {
  buttons.update();
  window.Repaint();
}

function on_playback_seekbar() {
  seekbar.playback_seekbar();
}

function on_playback_starting() {
  buttons.update();
  window.Repaint();
}

function on_playback_stop(reason) {
  if (reason != 2) {
    panel.item_focus_change();
  }
  buttons.update();
  window.Repaint();
}

function on_playlist_switch() {
  panel.item_focus_change();
}

function on_size() {
  panel.size();
  let art_spc = 8; //spacer around album art
  let bar_h = ppt.seekbar_height > 1 ? _scale(ppt.seekbar_height) : 2;

  art.h = ppt.artsize >= 20 && ppt.artsize <= (panel.h - (art_spc * 2)) ? ppt.artsize : 59;
  art.w = art.h;
  art.x = art_spc;
  art.y = ((panel.h - ((art_spc * 2) + art.h)) / 2) >= art_spc ? ((panel.h - ((art_spc * 2) + art.h)) / 2) : art_spc;// + (seekbar.y + seekbar.h);

  let bar_y = art.y + art_spc;

  seekbar.x = Math.round(panel.w / 3);
  seekbar.y = bar_y;
  seekbar.w = Math.round(panel.w / 3);
  seekbar.h = bar_h;

  volbar.y = bar_y;
  volbar.w = Math.round(panel.w / 6);
  volbar.x = Math.round(panel.w - volbar.w) - _scale(ppt.bs);
  volbar.h = bar_h;

  handle_h = Math.floor(ppt.seekbar_handle) > (bar_h * 2) ? (bar_h * 2) : Math.floor(ppt.seekbar_handle);
  handle_y = seekbar.y - ((handle_h - seekbar.h) / 2);

  buttons.update();
  window.Repaint();
}

function on_volume_change() {
  buttons.update();
  volbar.volume_change();
  window.Repaint();
}

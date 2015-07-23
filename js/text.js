$(function(){
	var init = function(){

		bindEvent.init();
		config.init();
		render.init();

	},

	asyn = {

	},

	render = {

		init : function(){
			this.initEditor();
		},

		initEditor : function(){
			var wh = window.innerHeight,
				wrap = $('.site-wrap');
			this.togglePanel('folder-wrap',false);
			this.togglePanel('file-wrap',false);
			this.togglePanel('textarea-wrap',true);
			this.togglePanel('render-area',true);
		},

		togglePanel : function(panelName,isVisible){
			var ww = window.innerWidth,
				ratio,
				panel = $('.site-wrap .' + panelName);

			isVisible?panel.removeClass('folded'):panel.addClass('folded');
			this.fixedPanelWidth();

			if(panelName === 'folder-wrap' || panelName === 'file-wrap'){
				ratio = isVisible?0.2:0.05;
			}
			else
				ratio = isVisible?0.4:0.05;
			panel.css('width',ww*ratio);
		},

		fixedPanelWidth : function(){
			var w = ctrl.getW(),
				wrap = $('.site-wrap');
			console.log(w);
			if(w<8){
				//small
				wrap.css('width','100%');
			}
			else if(w < 10){
				//medium
				wrap.css('width','110%');
			}
			else{
				//large
				wrap.css('width','130%');
			}
		},




	},

	bindEvent = {
		init : function(){
			//this.editAreaEvent();
		},

		editAreaEvent : function(){
			var currentText,
				editArea = $('#edit-area'),
				textBreakInterval;

			function textBreak(){
				$('#renderArea').html(config.md.render(editArea.val()));
			}

			editArea.keyup(function(){
				clearTimeout(textBreakInterval);
				textBreakInterval = setTimeout(textBreak,500);
			})
		},





	},

	ctrl = {

		init : function(){

		},

		getW : function(){
			var wraps = $('.site-wrap>div:not(.folded)'),
				w = 0;
			for(var i = 0;i<wraps.length;i++)
				w += wraps.eq(i).index()+1;
			return w;
		},


	},

	config = {

		md : null,

		init : function(){

			//var Remarkable = require('remarkable');
			//var hljs       = require('highlight.js') // https://highlightjs.org/

			this.md = new Remarkable('full', {
			  html:         false,        // Enable HTML tags in source
			  xhtmlOut:     false,        // Use '/' to close single tags (<br />)
			  breaks:       false,        // Convert '\n' in paragraphs into <br>
			  langPrefix:   'language-',  // CSS language prefix for fenced blocks
			  linkify:      true,         // autoconvert URL-like texts to links

			  // Enable some language-neutral replacements + quotes beautification
			  typographer:  false,

			  // Double + single quotes replacement pairs, when typographer enabled,
			  // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
			  quotes: '“”‘’',

			  // Highlighter function. Should return escaped HTML,
			  // or '' if input not changed
			  highlight: function (str, lang) {
			    if (lang && hljs.getLanguage(lang)) {
			      try {
			        return hljs.highlight(lang, str).value;
			      } catch (__) {}
			    }

			    try {
			      return hljs.highlightAuto(str).value;
			    } catch (__) {}

			    return ''; // use external default escaping
			  }
			});
		},




	};



	console.log(render);

	init();

});
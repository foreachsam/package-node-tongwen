
var Converter = {
	_Instance: null,
	newInstance: function() {
		var obj = {

			run: function() {
				//this.init();

				var table = this.getTable();

				var type = this.getType();
				var str = this.getOld();
				var map = this.getTable();

				// 單字轉換
				var list = str.split('');

				list.forEach(function(item, key, list) {
					list[key] = map[item] || item;
				});

				str = list.join('');

				this.setNew(str);

				if (type === 'S2T_OnlyMap') {
					return this;
				}

				if (type === 'T2S_OnlyMap') {
					return this;
				}

				var len = Math.min(this.getMaxLen(), str.length);

				//console.log('len:', len);

				// 詞彙轉換
				var txt = "", s = "", bol = true;
				for (var i = 0, c = str.length; i < c;) {
					bol = true;
					for (var j = len; j > 1; j--) {
						s = str.substr(i, j);
						if (s in map) {
							txt += map[s];
							i += j;
							bol = false;
							break;
						}
					}

					if (bol) {
						txt += str.substr(i, 1);
						i++;
					}
				}
				if (txt != "") {
					str = txt;
				}

				this.setNew(str);


				return this;
			},
			/*
            init: function() {

                var name = 'init_' + this.getType();
                var func = this[name];

                if (!func) {
                    return this;
                }

                func.apply(this);

                return this;
            },

            init_S2T: function() {
                //console.log(this);
                //console.log('S2T');

            },

            init_T2S: function() {
                //console.log(this);
                //console.log('T2S');

            },
			*/

			_Old: null,

			getOld: function() {
				if (this._Old === null) {
					this._Old = this.defOld();
				}

				return this._Old;
			},

			setOld: function(val) {
				this._Old = val;
				return this;
			},

			defOld: function() {
				return '';
			},

			_New: null,

			getNew: function() {
				if (this._New === null) {
					this._New = this.defNew();
				}

				return this._New;
			},

			setNew: function(val) {
				this._New = val;
				return this;
			},

			defNew: function() {
				return '';
			},

            _Type: null,

            getType: function() {
            	if (this._Type === null) {
            		this._Type = this.defType();
            	}

            	return this._Type;
            },

            setType: function(val) {
            	this._Type = val;
            	return this;
            },

            defType: function() {
            	return 'S2T';
            },

            _Table: null,

            getTable: function() {
            	if (this._Table === null) {
            		this._Table = this.defTable();
            	}

            	return this._Table;
            },

            setTable: function(val) {
            	this._Table = val;
            	return this;
            },

            defTable: function() {
            	return Converter.refTable(this.getType());
            },

			_MaxLen: null,

			getMaxLen: function() {
				if (this._MaxLen === null) {
					this._MaxLen = this.defMaxLen();
				}

				return this._MaxLen;
			},

			setMaxLen: function(val) {
				this._MaxLen = val;
				return this;
			},

			defMaxLen: function() {
				return Converter.refMaxLen(this.getType());
			},

			_End: 'Object:Converter'

		};

		return obj;
	},

	getInstance: function() {
		if (this._Instance === null) {
			this._Instance = this.newInstance();
		}
		return this._Instance;
	},

    _Table: {
        S2T: null,
        T2S: null,
        S2T_OnlyMap: null,
        T2S_OnlyMap: null
    },

    _MaxLen: {
        S2T: null,
        T2S: null,
        S2T_OnlyMap: null,
        T2S_OnlyMap: null
    },

    refMaxLen: function(key) {
        var rtn = this._MaxLen[key];

        if (rtn === null) {
            rtn = 0;
        }

        return rtn;
    },

    putMaxLen: function(key, val) {
        this._MaxLen[key] = val;
        return this;
    },

    refTable: function(key) {
        var table = this._Table[key];
        if (table === null) {
            table = this.findTable(key);
            this._Table[key] = table;
        }

        return this._Table[key];
    },

    mergeTable: function(newTable, oldTable, len) {

        for (var i in newTable) {
            oldTable[i] = newTable[i];
    		len = Math.max(len, newTable[i].length);
    	}

        return len;
    },

    findTable: function(key) {
        var name = 'findTable_' + key;
        var func = this[name];

        if (!func) {
            return {};
        }

        return func.apply(this);
    },

    findTable_S2T_OnlyMap: function() {
		var rtn = {};
		var len = 1;
		var map = this.findMap_S2T();
		len = this.mergeTable(map, rtn, len);
		this.putMaxLen('S2T_OnlyMap', len);
        return rtn;
    },

    findTable_T2S_OnlyMap: function() {
		var rtn = {};
		var len = 1;
		var map = this.findMap_T2S();
		len = this.mergeTable(map, rtn, len);
		this.putMaxLen('T2S_OnlyMap', len);
        return rtn;
    },

    findTable_S2T: function() {
		var rtn = {};
		var len = 1;
		var map = this.findMap_S2T();
		var phrase = this.findPhrase_S2T();
		len = this.mergeTable(map, rtn, len);
		len = this.mergeTable(phrase, rtn, len);
		this.putMaxLen('S2T', len);
        return rtn;
    },

    findTable_T2S: function() {
		var rtn = {};
		var len = 1;
		var map = this.findMap_T2S();
		var phrase = this.findPhrase_T2S();
		len = this.mergeTable(map, rtn, len);
		len = this.mergeTable(phrase, rtn, len);
		this.putMaxLen('T2S', len);
        return rtn;
    },

    findMap_S2T: function() {
        return require('../table/Map/S2T.json');
    },

    findMap_T2S: function() {
        return require('../table/Map/T2S.json');
    },

    findPhrase_S2T: function() {
        return require('../table/Phrase/S2T.json');
    },

    findPhrase_T2S: function() {
        return require('../table/Phrase/T2S.json');
    },

	_End: 'Class:Converter'
};

module.exports.Converter = Converter;

function newConverter() {
    var rtn = Converter.newInstance();

    return rtn;
}

module.exports.newConverter = newConverter;

function s2t(str) {
    //console.log('s2t');
	var converter = newConverter();

	converter
		.setType('S2T')
		.setOld(str)
		.run()
	;

	return converter.getNew();
}

module.exports.s2t = s2t;

function t2s(str) {
    //console.log('t2s');
	var converter = newConverter();

	converter
		.setType('T2S')
		.setOld(str)
		.run()
	;

	return converter.getNew();
}

module.exports.t2s = t2s;


module.exports.s2t_onlymap = function(str) {
    //console.log('s2t_onlymap');
	var converter = newConverter();

	converter
		.setType('S2T_OnlyMap')
		.setOld(str)
		.run()
	;

	return converter.getNew();
}

module.exports.t2s_onlymap = function(str) {
    //console.log('t2s_onlymap');
	var converter = newConverter();

	converter
		.setType('T2S_OnlyMap')
		.setOld(str)
		.run()
	;

	return converter.getNew();
}

module.exports.s2tEach = function(list) {
	//console.log('s2tEach:' , list);
	var util = require('./util.js');
	util.convertFileListSync(list, s2t);
}

module.exports.t2sEach = function(list) {
	//console.log('t2sEach:' , list);
	var util = require('./util.js');
	util.convertFileListSync(list, t2s);
}

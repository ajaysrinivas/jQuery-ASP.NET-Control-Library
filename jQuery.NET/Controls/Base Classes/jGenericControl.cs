﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.UI.WebControls;
using jQuery.NET.Utility;

namespace jQuery.NET.Controls.Base
{
    public abstract class jGenericControl : WebControl, Interfaces.IjControl
    {

        public bool IncludeJquery { get; set; }
        public bool IncludeJqueryUI { get; set; }
        public string JqueryVersion { get; set; }
        protected jControlHelper Helper { get; set; }

        protected jGenericControl() : base()
        {
            IncludeJquery = true;
            JqueryVersion = Properties.Resources.jQueryVersion;
            Helper = new jControlHelper(this);
        }
    }
}

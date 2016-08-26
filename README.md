## Template

支持web客户端和NodeJs服务端的javascript模板引擎

#### 基础指令说明

指令 | 写法 | 意义
---|---|---
javascript可执行语句 | <% for(...) %> | 一些流程控制语句(for, if, else...)
读取数据属性 | <%= item.title %> | 读取当前数据的属性或本身
HTML转义输出 | <$ item.html $> | 将HTML中的特殊字符转义后并且输出

#### API

web端:

	<script id="template" type="javascript/template">
		<ul>
			<% for(var i in obj){ %>
				<li><%= obj[i].text %></li>
			<% } %>
		</ul>
	</script>
    <script type="text/javascript" src="src/Template.js"></script>
    <script type="text/javascript">
        window.onload = function() {
           var tpl = document.querySelector("#template").innerHTML;
           var compileRes = Template.compile(tpl);
           var items = [
                    {
                        "text": "list1"
                    },
                    {
                        "text": "list2"
                    },
                    {
                        "text": "list3"
                    }
               ];
           document.querySelector(...).innerHTML = Template.render(compiled, items);
        };
    </script>
    
或者

    <script type="text/javascript" src="src/Template.js"></script>
    <script type="text/javascript">
        window.onload = function() {
           var tpl = "<% for(var i = 0, len = data.length; i < len i ++) %><li><%= data[i].text %></li><% } %>";
           var compileRes = Template.compile(tpl);
           var data = [
                    {
                        "text": "list1"
                    },
                    {
                        "text": "list2"
                    },
                    {
                        "text": "list3"
                    }
               ];
           document.querySelector(...).innerHTML = Template.render(compiled, data);
        };
    </script>
    
Nodejs
    
    developing ...
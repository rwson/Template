## Template

javascript模板引擎

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
           var tpl = "<% for(var i = 0, len = obj.length; i < len i ++) %><li><%= obj[i].text %></li><% } %>";
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
    
大多数模板引擎中是模板编译方法中使用with语句动态修改其内部的this指向，本模板的compile中没有采用这种做法，而是在指定了一个默认参数obj，因此，在编写模板语句时，对数据的读操作务必采用obj.xxx或者obj['xxx']这种形式，防止在运行时报“xxx is not defined”的异常
    
